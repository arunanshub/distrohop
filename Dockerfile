FROM node:slim as builder

WORKDIR /app

ARG TURSO_AUTH_TOKEN
ARG DATABASE_URL

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:slim

WORKDIR /app

COPY --from=builder /app/.output .output/

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
