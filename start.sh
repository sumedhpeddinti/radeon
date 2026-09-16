#!/bin/sh
set -e

echo "=== Starting Unified Medusa + Storefront Container ==="

# Export default environment variables for Storefront & Medusa Backend if not provided by Azure
export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY="${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:-pk_b8e3def8a11e2bb7a71766f316810de8740a75d1cb42768c192d810d43ef5027}"
export NEXT_PUBLIC_MEDUSA_BACKEND_URL="${NEXT_PUBLIC_MEDUSA_BACKEND_URL:-https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net}"
export NEXT_PUBLIC_DEFAULT_REGION="${NEXT_PUBLIC_DEFAULT_REGION:-in}"
export NEXT_PUBLIC_BASE_URL="${NEXT_PUBLIC_BASE_URL:-https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net}"

export STORE_CORS="${STORE_CORS:-http://localhost:8000,https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net,https://radeon.online,https://www.radeon.online}"
export ADMIN_CORS="${ADMIN_CORS:-http://localhost:5173,http://localhost:9000,https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net,https://radeon.online,https://www.radeon.online}"
export AUTH_CORS="${AUTH_CORS:-http://localhost:5173,http://localhost:9000,https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net,https://radeon.online,https://www.radeon.online}"
export JWT_SECRET="${JWT_SECRET:-e9dd289839c9d2452695c03648992d3ef3bbb0ad23dc9f8c0fd5e1ee7f9190cd}"
export COOKIE_SECRET="${COOKIE_SECRET:-d6fdf10f29f0c7328409b2c6104e8129b23228e38735700af9a310125405fa35}"
export ADMIN_AUTH_TYPE="${ADMIN_AUTH_TYPE:-jwt}"
export ADMIN_JWT_TOKEN_STORAGE_KEY="${ADMIN_JWT_TOKEN_STORAGE_KEY:-medusa_jwt_token}"
export DATABASE_URL="${DATABASE_URL:-postgresql://postgres.hokurffekzfhemoitgub:Sum%402005Teja%402006@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres}"

# 1. Start Medusa backend on port 9001
cd /app/backend
PORT=9001 npx medusa start &
MEDUSA_PID=$!
echo "Medusa started with PID $MEDUSA_PID on port 9001"

# 2. Start Next.js storefront on port 8000
cd /app/storefront
npm run start &
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
