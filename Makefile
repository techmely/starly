build.ddd:
	bun run nx run-many -t build -p @techmely/ddd-core @techmely/ddd-users

build: 
	bun run nx run-many -t build -p

dev: 
	bun run workspaces foreach -Rpt run dev

lint.format: 
	bun run biome check . --apply

lint.circular: 
	bun run madge --extensions ts --exclude '.d.ts$' --circular .

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
	bun run workspaces foreach -Rpt run docker.build

docker.storage: 
	bun run workspaces foreach -Rpt run docker.storage

docker.up: 
	bun run workspaces foreach -Rpt run docker.up