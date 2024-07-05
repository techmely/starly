FROM oven/bun:1 AS builder
WORKDIR /usr/api

COPY . .

RUN bun install

FROM oven/bun:1
WORKDIR /usr/api
COPY --from=builder /usr/api .

USER bun
EXPOSE 3000/tcp
CMD [ "dotenvx", "run", "--", "bun", "run", "index.ts" ]
