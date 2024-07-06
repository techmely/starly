FROM debian:11.6-slim as builder

WORKDIR /app

RUN apt update
RUN apt install curl unzip bash -y

RUN curl https://bun.sh/install | bash

COPY . .

RUN /root/.bun/bin/bun install --production

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun /usr/local/bin/bun
COPY --from=builder /app .

ENV NODE_ENV production
EXPOSE 3000

CMD [ "bun", "--env-file=.env.decrypted", "index.ts" ]
