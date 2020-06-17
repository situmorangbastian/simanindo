lint:
	deno lint --unstable

migrate:
	deno run --allow-net --allow-read --allow-write --allow-plugin --unstable repository/migrate.ts

run:
	deno run --allow-net --allow-write --allow-read --unstable  --allow-plugin ./app.ts
