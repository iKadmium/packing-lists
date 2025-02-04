# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY drizzle ./drizzle
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/svelte.config.js ./

RUN npm i -g pnpm && pnpm install --frozen-lockfile

# ENV NODE_ENV=production

CMD ["node", "build"]