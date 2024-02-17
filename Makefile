build.ddd:
	bun run nx run-many -t build -p @techmely/api-core @techmely/api-users

build: 
	bun run nx run-many -t build -p

dev: 
	bun run nx run-many -t dev

lint.format: 
	bunx @biomejs/biome check . --apply

lint.circular: 
	bun run madge --extensions ts --exclude '.d.ts$' --circular .

lint.typecheck:
	bun tsc

lint.useless: 
	bun run knip

test.unit: 
	bun run vitest --passWithNoTests

test.unit.coverage: 
	bun run vitest --coverage.all

test.unit.run: 
	bun run vitest run --passWithNoTests

migration.add: 
	node scripts/generateMigrateFileApi.mjs

migration.run: 
	bun run tsx scripts/migrate-db.ts

docker.build: 
	bun run nx run-many -t docker.build

docker.storage: 
	bun run nx run-many -t docker.storage

docker.up: 
	bun run nx run-many -t docker.up

clean:
	bun run nx run-many -t clean -p

upgrade.deps:
	bun run nx run-many -t upgrade.deps -p
	bun install