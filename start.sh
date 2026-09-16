#!/bin/sh
set -e

echo "=== Starting Unified Medusa + Storefront Container ==="

# 1. Start Medusa backend on port 9001
cd /app/backend
PORT=9001 npx medusa start &
MEDUSA_PID=$!
echo "Medusa started with PID $MEDUSA_PID on port 9001"

# 2. Start Next.js storefront on port 8000
cd /app/storefront
PORT=8000 npm run start -- -p 8000 &
STOREFRONT_PID=$!
echo "Storefront started with PID $STOREFRONT_PID on port 8000"

# 3. Start Nginx reverse proxy on port 9000
echo "Starting Nginx reverse proxy on port 9000..."
nginx

# Trap termination signals to kill children cleanly
trap "kill -TERM $MEDUSA_PID $STOREFRONT_PID 2>/dev/null; exit 0" SIGTERM SIGINT

# Monitor loop to keep container alive and restart if anything fails
while true; do
    if ! kill -0 $MEDUSA_PID 2>/dev/null; then
        echo "Medusa backend process died! Exiting..."
        exit 1
    fi
    if ! kill -0 $STOREFRONT_PID 2>/dev/null; then
        echo "Storefront process died! Exiting..."
        exit 1
    fi
    sleep 5
done
