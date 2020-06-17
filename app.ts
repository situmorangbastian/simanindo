import { Status } from "https://deno.land/std/http/http_status.ts"

import { Application } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { Response } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts"

import { router } from './handler.ts'
import { AccountModel } from './repository/model.ts'
import mysql from './repository/mysql.ts'

mysql.link([AccountModel])
await mysql.sync()

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())
app.use(({ response }: { response: Response }) => {
    response.status = Status.BadRequest.valueOf()
    response.body = {
        message: "Not Found",
    }
})

const env = config()
const HOST_PORT = env.APP_HOST+":"+env.APP_PORT
console.log("Listening on: "+HOST_PORT)
await app.listen(HOST_PORT)