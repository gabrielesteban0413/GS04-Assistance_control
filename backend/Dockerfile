FROM oven/bun:1.3.0-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package.json tsconfig.json ./ 


CMD ["bun", "./src/index.ts"]
