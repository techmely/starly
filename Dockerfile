FROM oven/bun:alpine as builder
WORKDIR /app

COPY . .
# RUN which bun
RUN bun install --production

FROM oven/bun:alpine
WORKDIR /app
# RUN which bun
COPY --from=builder app/dist ./dist
COPY --from=builder app/.env ./.env
COPY --from=builder app/package.json ./package.json
COPY --from=builder app/tsconfig.json ./tsconfig.json
COPY --from=builder app/locales ./locales
COPY --from=builder app/firebase ./firebase
COPY --from=builder app/server ./server
COPY --from=builder app/bun.lockb ./bun.lockb
COPY --from=builder app/node_modules ./node_modules

ENV NODE_ENV production
EXPOSE 3000

CMD [ "bun", "run", "start" ]
