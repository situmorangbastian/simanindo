import { Status } from "https://deno.land/std/http/http_status.ts"

import { Application, Context } from 'https://deno.land/x/oak@v6.3.1/mod.ts'
import { config } from "https://deno.land/x/dotenv@v1.0.1/mod.ts"

import { router } from './handler.ts'
import mysqlClient from './repository/mysql.ts'

await mysqlClient.execute(`CREATE DATABASE IF NOT EXISTS simanindo`);
await mysqlClient.execute(`USE simanindo`);

await mysqlClient.execute(`
    CREATE TABLE IF NOT EXISTS accounts (
        id varchar(255) DEFAULT NULL,
        name varchar(255) DEFAULT NULL,
        email varchar(255) DEFAULT NULL,
        password varchar(255) DEFAULT NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`);

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())
app.use((ctx: Context) => {
    ctx.response.status = Status.NotFound
    ctx.response.body = {
        error: "not found",
    }
})

const env = config()
const HOST_PORT = env.APP_HOST+":"+env.APP_PORT
console.log("Listening on: "+HOST_PORT)
await app.listen(HOST_PORT)
