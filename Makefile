lint:
	deno lint --unstable

run:
	deno run --allow-net --allow-read --allow-write --allow-plugin --unstable ./app.ts
