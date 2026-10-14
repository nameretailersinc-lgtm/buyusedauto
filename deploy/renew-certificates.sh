#!/bin/sh
set -eu
cd /opt/buyusedauto
docker compose run --rm certbot renew --webroot -w /var/www/certbot
docker compose exec -T nginx nginx -t
docker compose exec -T nginx nginx -s reload
