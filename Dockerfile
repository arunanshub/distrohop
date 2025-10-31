# syntax=docker.io/docker/dockerfile:1

# --------------------------------------------
# Base stage
# --------------------------------------------
FROM node:24-alpine AS base

# --------------------------------------------
# Dependencies stage
# --------------------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package management files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./

# Since we are using corepack, we need to modify the pnpm cache dir's path
RUN corepack enable pnpm && \
    pnpm config set store-dir /pnpm/store

# Install dependencies with cache optimization
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm i --frozen-lockfile

# --------------------------------------------
# Builder stage
# --------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1 \
    # we may not have all the variables readily available during docker build
    SKIP_ENV_VALIDATION=true \
    STANDALONE_IN_PROD=true

# Since we are using corepack, we need to modify the pnpm cache dir's path
RUN corepack enable pnpm && \
    pnpm config set store-dir /pnpm/store

# Build application with cache optimization
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build

# --------------------------------------------
# Production stage
# --------------------------------------------
FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Copy built assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Finalize container setup
EXPOSE 3000
CMD ["server.js"]
