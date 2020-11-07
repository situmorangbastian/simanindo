import { Status } from "https://deno.land/std/http/http_status.ts"

import { Application, Context } from 'https://deno.land/x/oak@v6.3.1/mod.ts'
import { config } from "https://deno.land/x/dotenv@v1.0.1/mod.ts"

import { router } from './handler.ts'
import { AccountModel } from './repository/model.ts'
import mysql from './repository/mysql.ts'

mysql.link([AccountModel])
await mysql.sync()

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
