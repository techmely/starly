ARG NODE_VERSION=20.12.2
ARG PORT=4001
ARG NEXT_PUBLIC_APP_VERSION
ARG NODE_ENV

RUN curl -sfS https://dotenvx.sh/install.sh | sh

FROM node:${NODE_VERSION}-alpine as builder

USER node

WORKDIR /app/api

COPY --chown=node . .

RUN yarn install --production --frozen-lockfile --no-progress

FROM node:${NODE_VERSION}-alpine

USER node

WORKDIR /app/api

ENV NEXT_TELEMETRY_DISABLED=true
ENV PORT=$PORT
ENV NEXT_PUBLIC_APP_VERSION=$NEXT_TELEMETRY_DISABLED
ENV NODE_ENV=$NODE_ENV

COPY --from=builder --chown=node /app/api/node_modules ./node_modules
COPY --from=builder --chown=node /app/api/package.json ./package.json

EXPOSE 4001

CMD ["yarn", "start"]
