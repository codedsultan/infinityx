# syntax=docker/dockerfile:1.5
# Global build arg: can be used in any FROM below
ARG PHP_VERSION=8.3

####################################
# Stage 1: Node frontend build
FROM node:22-alpine AS node-builder

WORKDIR /app

ARG VITE_PUSHER_APP_KEY
ARG VITE_PUSHER_APP_CLUSTER
ARG VITE_APP_NAME

# Expose them as env vars for Vite
ENV NODE_ENV=production
ENV VITE_PUSHER_APP_KEY=${VITE_PUSHER_APP_KEY}
ENV VITE_PUSHER_APP_CLUSTER=${VITE_PUSHER_APP_CLUSTER}
ENV VITE_APP_NAME=${VITE_APP_NAME}


COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

COPY . .
RUN npm run build


####################################
# Stage 2: Production (nginx + PHP-FPM)

FROM serversideup/php:${PHP_VERSION}-fpm-nginx AS production

ENV APP_BASE_DIR=/var/www/html \
    SSL_MODE=off \
    PHP_OPCACHE_ENABLE=1 \
    HEALTHCHECK_PATH=/healthcheck

WORKDIR ${APP_BASE_DIR}

USER root

# Composer deps
COPY composer.json composer.lock ./
RUN --mount=type=cache,target=/root/.composer \
    composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --optimize-autoloader

# Copy app code
COPY . ${APP_BASE_DIR}

# Copy built frontend assets
COPY --from=node-builder /app/public/build ${APP_BASE_DIR}/public/build

# Fix permissions using serversideup helper
RUN docker-php-serversideup-set-file-permissions \
    --owner www-data \
    --group www-data \
    ${APP_BASE_DIR}

USER www-data

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:8080${HEALTHCHECK_PATH} || exit 1
