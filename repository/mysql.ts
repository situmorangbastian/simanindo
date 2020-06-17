import { config } from "https://deno.land/x/dotenv/mod.ts"
import { Database } from 'https://deno.land/x/denodb/mod.ts'

const env = config()

const mysql = new Database('mysql', {
    host: env.MYSQL_HOSTNAME,
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DB,
})

export default mysql