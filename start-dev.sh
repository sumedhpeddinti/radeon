#!/bin/bash
# Radeon store — dev servers launcher
# Starts the Medusa backend (port 9000) and the storefront (port 8000)

cd "$(dirname "$0")"

echo "[1/2] Starting backend on :9000 ..."
cd backend
PORT=9000 nohup npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "[2/2] Starting storefront on :8000 ..."
cd store-userview
nohup npm run dev > /tmp/storefront.log 2>&1 &
STOREFRONT_PID=$!
cd ..

echo "Backend PID: $BACKEND_PID | Storefront PID: $STOREFRONT_PID"
echo "Logs: /tmp/backend.log, /tmp/storefront.log"
echo "Waiting for servers..."
for i in $(seq 1 24); do
  sleep 5
  B=$(curl -s -m 3 http://localhost:9000/health 2>/dev/null)
  S=$(curl -s -m 3 -o /dev/null -w "%{http_code}" http://localhost:8000 2>/dev/null)
  echo "  t=$((i*5))s backend='$B' storefront=$S"
  if [ "$B" = "OK" ] && [ "$S" = "200" ]; then
    echo "✅ Both up! Store: http://localhost:8000 | Admin: http://localhost:9000/app"
    exit 0
  fi
done
echo "⚠️ Servers not fully up yet — check the logs"
