FROM docker.io/library/node:18-alpine AS builder

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

FROM gcr.io/distroless/nodejs:18 AS runner

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

# Specify container only environment variables ( can be overwritten by runtime env )
ENV NUXT_STORAGE_FS_BASE='/techmely/web/data'

# Persistent storage data
VOLUME [ "/techmely/web/data" ]

CMD ["node", ".output/server/index.mjs"]
