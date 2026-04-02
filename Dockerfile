FROM node:20-alpine AS base

RUN apk add --no-cache curl

WORKDIR /app

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build

COPY . .
RUN npm run build

FROM base AS production

ENV NODE_ENV=production
ENV PORT=5000

COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
RUN npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/attached_assets ./attached_assets

EXPOSE 5000

CMD ["node", "dist/index.js"]