# Deploy alongside existing Nginx websites

Use this path on the user's VPS, which already has Nginx sites for chitralhive, nameretailer and premierseoservices. The app stays in `/opt/buyusedauto`; no `/var/www` move is needed. Keep existing Nginx running. Start only the app container, bound to loopback port 3017. Do not start this repository's containerized nginx/certbot services or install its Docker renewal cron on this host.

## Inspect before changes

```sh
cd /opt/buyusedauto
docker --version
docker compose version
nginx -t
ss -ltnp | grep ':3017 ' || true
grep -R 'buyusedautomobiles.com' /etc/nginx/sites-enabled /etc/nginx/sites-available || true
command -v certbot || true
cat /etc/os-release
```

If port 3017 is occupied, choose another unused local port in both the Compose override and Nginx proxy. If a configuration already exists for this domain, review it before creating another. Do not change existing site files or stop their services.

## Build only the app

After committing/pushing the new override and template from the development workspace, pull the intended branch on the VPS. Preserve the existing `.env`; do not copy `.env.example` over it again.

```sh
cd /opt/buyusedauto
git pull --ff-only
docker compose -f compose.yaml -f compose.host-nginx.yaml config --quiet
docker compose -f compose.yaml -f compose.host-nginx.yaml up -d --build app
docker compose -f compose.yaml -f compose.host-nginx.yaml ps app
curl -f http://127.0.0.1:3017/api/health
```

The response should be `{"status":"ok"}`. Use `SITE_INDEXING=disabled` in `.env` until the public launch is reviewed; production requires a verified operator name, correct canonical HTTPS origin, supplied contact details and policy review. Rebuild the app after changing build-time public values or indexing intent.

## Add this domain to host Nginx

Only when there is no existing file/link for this domain:

```sh
test ! -e /etc/nginx/sites-available/buyusedautomobiles && test ! -L /etc/nginx/sites-available/buyusedautomobiles && test ! -e /etc/nginx/sites-enabled/buyusedautomobiles && test ! -L /etc/nginx/sites-enabled/buyusedautomobiles && install -m 644 deploy/nginx/host-site.conf /etc/nginx/sites-available/buyusedautomobiles && ln -s /etc/nginx/sites-available/buyusedautomobiles /etc/nginx/sites-enabled/buyusedautomobiles
nginx -t && systemctl reload nginx
curl -f -H 'Host: buyusedautomobiles.com' http://127.0.0.1/api/health
```

If any test fails, inspect the existing domain file instead of overwriting it. If `nginx -t` fails, correct this new site before reloading. A successful graceful reload keeps the other configured sites in service.

## DNS and TLS

Point this domain's apex and www A records to `5.189.158.75`; remove conflicting AAAA records unless the configured IPv6 address also serves this site. Verify both names resolve correctly and port 80 is reachable. Reuse the host's existing Certbot installation and renewal mechanism. If absent, install the Nginx plugin according to the detected OS and official Certbot instructions, without removing an existing certificate setup.

```sh
certbot --nginx -d buyusedautomobiles.com -d www.buyusedautomobiles.com --email info@nameretailer.com --agree-tos --redirect
nginx -t
curl -f https://buyusedautomobiles.com/api/health
curl -I http://buyusedautomobiles.com/tools
curl -I https://www.buyusedautomobiles.com/tools
certbot renew --cert-name buyusedautomobiles.com --dry-run
```

Confirm the certificate name from `certbot certificates` if Certbot created a different name. Check the existing renewal timer/cron and ensure Nginx reloads after renewal; do not add a second competing renewal job. Back up the new domain configuration before future manual edits. Certbot's Nginx plugin manages the host configuration/certificates, separate from the Docker certificate volumes.

## Updates

To hide the Nginx version on an already deployed Certbot-managed site, edit `/etc/nginx/sites-available/buyusedautomobiles` and add `server_tokens off;` inside both domain server blocks. Keep all certificate directives and other sites intact. Run `nginx -t && systemctl reload nginx`, then check `curl -I https://buyusedautomobiles.com/`. The header should read `server: nginx` without a version. Updating the repository template alone does not update this active host file. This setting does not remove the server name entirely.

```sh
cd /opt/buyusedauto
git pull --ff-only
docker compose -f compose.yaml -f compose.host-nginx.yaml up -d --build app
curl -f http://127.0.0.1:3017/api/health
curl -f https://buyusedautomobiles.com/api/health
```

Check the existing sites after first setup and verify deployed canonical, sitemap, robots and redirects. No server connection or remote deployment has been performed by this workspace. Docker/Nginx/Certbot runtime validation must be confirmed on the VPS.

References: [Docker loopback port publishing](https://docs.docker.com/reference/compose-file/services/#ports), [Certbot Nginx instructions](https://certbot.eff.org/instructions?ws=nginx).
