lint:
	deno lint --unstable

migrate:
	deno run --allow-net --allow-read --allow-write repository/migrate.ts

run:
	deno run --allow-net --allow-read --allow-write ./app.ts
