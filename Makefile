build.ui:
	pnpm run build "mely-core/*"

build.nocache:
	pnpm parcel build "mely-core/*" --no-cache

.PHONY: e2e.headless
e2e.headless:
	pnpm playwright test --headed

.PHONY: e2e.open
e2e.open:
	pnpm playwright test --project=chromium --ui