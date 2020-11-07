lint:
	deno lint --unstable

run:
	deno run -c tsconfig.json --allow-net --allow-read --allow-write --unstable app.ts

docker:
	docker build -t simanindo .

docker-run:
	docker run -it --init -p 9999:9999 simanindo
