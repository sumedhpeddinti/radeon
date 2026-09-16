# ==========================================
# Stage 1: Build Medusa Backend
# ==========================================
FROM node:22-alpine AS backend-builder
WORKDIR /app
RUN apk add --no-cache python3 make g++ git
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
ENV NODE_ENV=production
RUN npm run build

# ==========================================
# Stage 2: Build Next.js Storefront
# ==========================================
FROM node:22-alpine AS storefront-builder
WORKDIR /app
COPY store-userview/package*.json ./
RUN npm ci
COPY store-userview/ ./
ENV NODE_ENV=production
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_b8e3def8a11e2bb7a71766f316810de8740a75d1cb42768c192d810d43ef5027
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net
ENV NEXT_PUBLIC_DEFAULT_REGION=in
ENV NEXT_PUBLIC_BASE_URL=https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net
RUN npm run build

# ==========================================
# Stage 3: Unified Runner with Nginx
# ==========================================
FROM node:22-alpine AS runner
RUN apk add --no-cache nginx

# Copy Medusa Backend
WORKDIR /app/backend
ENV NODE_ENV=production
COPY --from=backend-builder /app/package*.json ./
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app/.medusa ./.medusa
COPY --from=backend-builder /app/medusa-config.ts ./
COPY --from=backend-builder /app/tsconfig.json ./
COPY --from=backend-builder /app/src ./src
COPY --from=backend-builder /app/public ./public
COPY --from=backend-builder /app/.medusa/server/public ./public

# Copy Storefront
WORKDIR /app/storefront
ENV NODE_ENV=production \
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_b8e3def8a11e2bb7a71766f316810de8740a75d1cb42768c192d810d43ef5027 \
    NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net \
    NEXT_PUBLIC_DEFAULT_REGION=in \
    NEXT_PUBLIC_BASE_URL=https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net
COPY --from=storefront-builder /app/package*.json ./
COPY --from=storefront-builder /app/node_modules ./node_modules
COPY --from=storefront-builder /app/.next ./.next
COPY --from=storefront-builder /app/public ./public
COPY --from=storefront-builder /app/next.config.js ./
COPY --from=storefront-builder /app/check-env-variables.js ./

# Copy Nginx Configuration & Startup Script
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh /app/start.sh
RUN sed -i 's/\r$//' /app/start.sh && chmod +x /app/start.sh

WORKDIR /app
ENV PORT=9000 \
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_b8e3def8a11e2bb7a71766f316810de8740a75d1cb42768c192d810d43ef5027 \
    NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net \
    NEXT_PUBLIC_DEFAULT_REGION=in \
    NEXT_PUBLIC_BASE_URL=https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net
EXPOSE 9000

CMD ["/app/start.sh"]

