FROM oven/bun:1 AS base
WORKDIR /usr/starly

ARG API_ROOT=apps/api

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY . /temp/dev
# COPY $API_ROOT/package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY . /temp/prod
# COPY $API_ROOT/package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/starly/apps/api .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "dotenvx", "run", "--", "bun", "run", "index.ts" ]
