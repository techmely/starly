build.ddd:
	yarn nx run-many -t build -p @techmely/ddd-core @techmely/ddd-users

build: 
	yarn nx run-many -t build -p --parallel=10

dev: 
	yarn workspaces foreach -Rpt run dev

lint.format: 
	yarn biome check . --apply

lint.circular: 
	yarn madge --extensions ts --exclude '.d.ts$' --circular .

lint.useless: 
	yarn knip

test.unit: 
	yarn vitest --passWithNoTests

test.unit.coverage: 
	yarn vitest --coverage.all

test.unit.run: 
	yarn vitest run --passWithNoTests

migration.add: 
	node scripts/generateMigrateFileApi.mjs

migration.run: 
	yarn tsx scripts/migrate-db.ts

docker.build: 
	yarn workspaces foreach -Rpt run docker.build

docker.storage: 
	yarn workspaces foreach -Rpt run docker.storage

docker.up: 
	yarn workspaces foreach -Rpt run docker.up