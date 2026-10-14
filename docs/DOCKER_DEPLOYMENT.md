# Docker deployment to 5.189.158.75

This setup runs Next.js as a non-root user behind Nginx. Only Nginx publishes ports; the app is private to Docker. Certificates and ACME challenges live in persistent Docker volumes. No database is required by the current app.

## 1. Upload the changes to GitHub

From this project in PowerShell, review the changes and commit the deployment files:

```powershell
git add Dockerfile .dockerignore compose.yaml next.config.ts .gitignore app/api/health/route.ts deploy docs/DOCKER_DEPLOYMENT.md
git commit -m "Add Docker and Nginx VPS deployment"
git push origin HEAD
```

These commands leave your existing `.env.example` edits out of the commit. If you want those changes in GitHub, review and commit them separately. Deploy the branch you pushed; use that branch name in the clone command below if it is not the default branch.

## 2. DNS and server prerequisites

Set these DNS records at your domain provider:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 5.189.158.75 |
| A | www | 5.189.158.75 |

Remove conflicting A records and any AAAA records unless this VPS also serves the listed IPv6 address. Allow inbound TCP 80 and 443 in the VPS provider firewall. Keep your SSH port allowed.

Log in:

```sh
ssh root@5.189.158.75
cat /etc/os-release
```

For **Ubuntu 24.04**, install Docker and the Compose plugin:

```sh
apt-get update
apt-get install -y docker.io docker-compose-v2 git
systemctl enable --now docker
docker compose version
```

If Docker is already installed, use it. For a different OS, use its supported Docker Engine installation instructions. Check `ss -ltnp` before launching: existing services using 80/443 must be migrated or stopped deliberately. This configuration needs both ports.

## 3. Clone and configure

```sh
git clone https://github.com/nameretailersinc-lgtm/buyusedauto.git /opt/buyusedauto
cd /opt/buyusedauto
cp .env.example .env
chmod 600 .env
nano .env
```

If the repository is private, authenticate Git with your GitHub credentials or a deploy key. Do not put tokens in clone URLs.

Set `NEXT_PUBLIC_SITE_URL=https://buyusedautomobiles.com`, `SITE_INDEXING=enabled`, and your verified operator name, address, and contact email. Analytics, Search Console, and AdSense IDs are optional. Public variables are compiled into the build: rebuild after changing `.env`.

```sh
docker compose config --quiet
docker compose up -d --build app nginx
docker compose ps
curl -f http://127.0.0.1/api/health
```

HTTP is the initial certificate bootstrap stage. Canonical URLs already use HTTPS, so proceed immediately to the certificate step after DNS resolves. If the build runs out of memory, increase VPS memory or add swap before retrying.

## 4. Enable HTTPS

Both domain names must resolve to this VPS and port 80 must be reachable before running this command. Replace the email with your monitored certificate contact address:

```sh
cd /opt/buyusedauto
docker compose run --rm certbot certonly --webroot -w /var/www/certbot --email YOUR_EMAIL --agree-tos --no-eff-email -d buyusedautomobiles.com -d www.buyusedautomobiles.com
```

Only after issuance succeeds, switch Nginx to HTTPS:

```sh
cp deploy/nginx/default.conf deploy/nginx/http-bootstrap.conf.backup
cat deploy/nginx/https.conf.template > deploy/nginx/default.conf
docker compose exec -T nginx nginx -t
docker compose exec -T nginx nginx -s reload
curl -f https://buyusedautomobiles.com/api/health
curl -I http://buyusedautomobiles.com
```

The write above preserves the mounted file inode so the running Nginx container sees the updated configuration. HTTP redirects to HTTPS. The app redirects www to the canonical domain.

## 5. Automatic certificate renewal

```sh
install -m 755 deploy/renew-certificates.sh /usr/local/sbin/buyusedauto-renew
printf '%s\n' '17 3,15 * * * root /usr/local/sbin/buyusedauto-renew >> /var/log/buyusedauto-renew.log 2>&1' > /etc/cron.d/buyusedauto-renew
chmod 644 /etc/cron.d/buyusedauto-renew
docker compose run --rm certbot renew --dry-run
systemctl status cron
```

If cron is missing, install and enable it (`apt-get install -y cron` and `systemctl enable --now cron`). Renewals run twice daily and reload Nginx after checking its configuration. Monitor the renewal log. Keep port 80 open for ACME renewals.

## 6. Updates and troubleshooting

GitHub being attached does not automatically deploy commits. After pushing an update, run:

```sh
cd /opt/buyusedauto
git pull --ff-only
docker compose up -d --build app
docker compose ps
curl -f https://buyusedautomobiles.com/api/health
```

The HTTPS configuration is a local change to `deploy/nginx/default.conf`. If a future pull changes that file, back it up, resolve the Git conflict, then restore the HTTPS template and validate/reload Nginx. Do not discard the HTTPS configuration blindly. Nginx resolves the app through Docker DNS so replacement containers remain reachable.

```sh
docker compose logs --tail=100 app nginx
docker compose exec -T nginx nginx -t
```

Container restart policies bring services back after a reboot. Keep the `.env` and certificate volumes backed up securely. Avoid `docker compose down -v`: it deletes certificate volumes. To roll back app code, select a previously working commit and rebuild the app, preserving `.env` and the active HTTPS configuration.
