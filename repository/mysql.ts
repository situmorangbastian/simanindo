import { config } from "https://deno.land/x/dotenv@v1.0.1/mod.ts"
import { Client } from "https://deno.land/x/mysql/mod.ts";

const env = config()

const mysqlClient = await new Client().connect({
    hostname: env.MYSQL_HOSTNAME,
    username: env.MYSQL_USERNAME,
    db: env.MYSQL_DB,
    password: env.MYSQL_PASSWORD,
  });

export default mysqlClient
