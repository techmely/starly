FROM oven/bun:1 AS builder
WORKDIR /usr/api

COPY . .

RUN bun install

FROM oven/bun:1
WORKDIR /usr/api
COPY --from=builder /usr/api .

USER bun
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "dotenvx", "run", "--", "bun", "run", "index.ts" ]
