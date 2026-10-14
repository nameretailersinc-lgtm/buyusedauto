#!/usr/bin/env bash
set -euo pipefail

commit="${1:-}"
[[ "$commit" =~ ^[0-9a-f]{40}$ ]] || { echo 'Invalid commit SHA'; exit 1; }
config=/opt/buyusedauto/.env
release="/opt/buyusedauto-releases/$commit"
archive="/tmp/buyusedauto-$commit.tar.gz"
state=/opt/buyusedauto-deploy
test -r "$config" && test -f "$archive"
command -v flock >/dev/null
mkdir -p "$state" "$release"
exec 9>"$state/deployment.lock"
flock -w 1800 9 || { echo 'Another deployment holds the lock'; exit 1; }

# Never update/reset the live Git checkout, host Nginx files, certificates or .env.
tar -xzf "$archive" -C "$release"
ln -sfn "$config" "$release/.env"
cd "$release"
test -f compose.yaml && test -f compose.host-nginx.yaml
image="buyusedauto-app:$commit"
cat > "$release/compose.release.yaml" <<EOF
services:
  app:
    image: $image
EOF
compose=(docker compose --project-name buyusedauto --env-file "$config" -f "$release/compose.yaml" -f "$release/compose.host-nginx.yaml" -f "$release/compose.release.yaml")
"${compose[@]}" config --quiet
container="$(docker ps -aq --filter label=com.docker.compose.project=buyusedauto --filter label=com.docker.compose.service=app)"
previous_image=''
if [ -n "$container" ]; then
  [[ "$container" != *$'\n'* ]] || { echo 'Multiple app containers found; inspect before deployment'; exit 1; }
  previous_image="$(docker inspect --format '{{.Image}}' "$container")"
fi

# Build completes before touching the currently running app.
"${compose[@]}" build app
switched=0
rollback() {
  code=$?
  trap - EXIT
  if [ "$code" -ne 0 ] && [ "$switched" -eq 1 ]; then
    if [ -n "$previous_image" ]; then
      echo 'Deployment failed; restoring the previous local app image.'
      printf 'services:\n  app:\n    image: %s\n' "$previous_image" > "$release/compose.rollback.yaml"
      if ! "${compose[@]}" -f "$release/compose.rollback.yaml" up -d --no-build --pull never --no-deps --wait --wait-timeout 180 app; then
        echo 'Rollback failed; inspect the app immediately.' >&2
      fi
    else
      echo 'No previous app image exists for rollback.' >&2
    fi
  fi
  exit "$code"
}
trap rollback EXIT
switched=1
"${compose[@]}" up -d --no-build --pull never --no-deps --wait --wait-timeout 180 app
curl --silent --show-error --fail --max-time 15 http://127.0.0.1:3017/api/health | grep -F '"status":"ok"'
curl --silent --show-error --fail --max-time 20 https://buyusedautomobiles.com/api/health | grep -F '"status":"ok"'
printf '%s\n' "$commit" > "$state/current-commit"
printf '%s\n' "$image" > "$state/current-image"
printf '%s\n' "$previous_image" > "$state/previous-image"
echo "Deployed tested commit $commit"
