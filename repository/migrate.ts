import { AccountModel } from '../repository/model.ts'
import mysql from '../repository/mysql.ts'

mysql.link([AccountModel])
await mysql.sync()