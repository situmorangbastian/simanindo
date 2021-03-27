lint:
	deno lint --unstable

run:
	deno run --allow-net --allow-read --allow-write app.ts

docker:
	docker build -t simanindo .

docker-run:
	docker run -it --init -p 9999:9999 simanindo
