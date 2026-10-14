# GitHub Actions CI/CD for the existing VPS

The workflow checks pull requests and main pushes. On main, the deployment job runs only after all checks pass and `VPS_DEPLOY_ENABLED=true` is configured. Manual workflow dispatch also deploys only main. No remote deployment has been run by this implementation.

## Checks

Node 22, npm ci, lint, calculator/content/SEO tests, production build, TypeScript, deployment Bash syntax, full Chromium browser tests, HTTP/SEO audits, Compose validation, Docker image build and health smoke test. Reports are uploaded for seven days. CI servers/containers are cleaned up after the job. Fork pull requests receive no deployment secrets; the workflow uses read-only repository permission and no pull_request_target event.

## One-time GitHub configuration

Create a GitHub environment named `production` under repository Settings > Environments. Restrict it to main; add reviewer protection if you want a manual release gate. Set these environment secrets:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | `5.189.158.75` |
| `VPS_USER` | SSH user with access to the deployment directories, existing `.env`, and Docker |
| `VPS_PORT` | Actual SSH port; blank defaults to 22 |
| `VPS_SSH_KEY` | Dedicated deployment private key; never put it in Git or chat |
| `VPS_KNOWN_HOSTS` | Verified SSH known_hosts entry for this host/port |

Create a dedicated SSH key on a trusted machine and add its public key to the chosen server user's authorized_keys, preserving existing keys. Configure the private half directly in GitHub Secrets. Host key verification is required: obtain the server's SSH host public key through the already trusted console/session and create a matching known_hosts line (for nonstandard ports use `[5.189.158.75]:PORT`). Do not use unverified runtime ssh-keyscan output or disable StrictHostKeyChecking. Test key authentication before enabling automatic deployment.

The SSH account needs write access to `/opt/buyusedauto-releases` and `/opt/buyusedauto-deploy`, and read access to `/opt/buyusedauto/.env`. Docker access is powerful and generally equivalent to root access; use a dedicated key/account within your existing server access model. The deployment script does not use sudo, reinstall Docker, alter firewalls, stop other services, or change host Nginx/certificates.

On the VPS, prepare the directories under the selected SSH account or assign them suitable ownership from the trusted administrative session:

```sh
mkdir -p /opt/buyusedauto-releases /opt/buyusedauto-deploy
test -r /opt/buyusedauto/.env
docker compose version
command -v flock
```

Retain the current `.env` with actual production values; workflow secrets do not replace it. Public variables are compiled on the VPS at build time. The existing site's operator and policy readiness remain separate launch requirements.

Then add repository variable `VPS_DEPLOY_ENABLED` with value `true` under Settings > Secrets and variables > Actions > Variables. Push the workflow and scripts to main. Keep this variable unset while reviewing setup; CI still runs.

## Release behaviour

The runner archives the exact tested commit, uploads it over host-verified SSH and invokes `deploy/github-deploy.sh`. Files are unpacked to `/opt/buyusedauto-releases/COMMIT`; its `.env` is a symlink to the existing protected production file. No server Git pull/reset is required, avoiding the previous untracked-file merge conflict. The live checkout is unchanged, so future updates should use the workflow consistently rather than mixing manual builds from an older checkout.

Compose uses the existing project name `buyusedauto` and the host-Nginx override. Only `app` is built/replaced. The image has a commit-specific tag. Build failure leaves the current app running. Deployments are serialized by GitHub concurrency and a server flock. Nginx continues proxying localhost:3017. Container health, loopback API response, and public HTTPS API response must all pass before the release is recorded.

If replacement or verification fails, the script attempts to restore the previous running image from local Docker storage and returns a failed workflow status. This is an image rollback using the candidate Compose configuration and current `.env`; it does not roll back configuration changes, database migrations or external services. It may briefly interrupt app requests while Compose replaces a container. It is not a zero-downtime deployment.

Release state is in `/opt/buyusedauto-deploy/current-commit`, `current-image` and `previous-image`. Archives, releases and images are retained for operator-managed cleanup. Do not prune the previous image before a rollback is no longer needed. Workflow failure notifications use GitHub's normal Actions notification mechanism; no external emails or alert integrations are configured.

## Validation and remaining setup

Local workflow YAML/structure, deployment Bash syntax, all inline workflow shell syntax, lint and 46 application tests passed. Git Bash was used for shell parsing after the WSL launcher was unavailable. The Windows environment has no Docker runtime; Linux execution, Compose, image build and SSH deployment are checked in GitHub/on the VPS. Until a real workflow run completes, neither CI success nor automatic deployment/rollback is claimed verified. Public health can fail for DNS/TLS/network reasons even if the local app is healthy; inspect the failed job before retrying.

Official GitHub-maintained checkout/setup-node/upload-artifact actions use major-version tags. Dependabot is configured for action updates. For stricter supply-chain pinning, replace these tags with verified full commit SHAs and let Dependabot update them; this environment could not resolve GitHub refs during setup and no invented pins were supplied.

References: [GitHub secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use), [deployment environments](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments).
