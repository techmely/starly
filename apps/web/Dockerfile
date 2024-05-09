FROM docker.io/library/node:20-alpine AS builder

# Prepare work directory
WORKDIR /techmely/web

RUN corepack enable

# Prepare build deps ( ignore postinstall scripts for now )
COPY package.json ./
COPY ../patches ./patches

# Copy all source files
COPY . ./

# Run full install with every postinstall script ( This needs project file )
RUN bun install

# Build
RUN bun run build

FROM gcr.io/distroless/nodejs:20 AS runner

ARG UID=911
ARG GID=911

# Create a dedicated user and group
RUN set -eux; \
    addgroup -g $GID techmely; \
    adduser -u $UID -D -G techmely techmely;

USER techmely

ENV NODE_ENV=production

COPY --from=builder /techmely/web/.output ./.output

EXPOSE 2023/tcp

ENV PORT=2023

# Persistent storage data
VOLUME [ "/techmely/web/data" ]

CMD ["node", ".output/server/index.mjs"]
