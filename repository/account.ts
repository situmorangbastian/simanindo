import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Account, 
} from "../entity.ts"
import mysqlClient from "../repository/mysql.ts"

const signUpRepo = async (account: Account) => {
    const result = await mysqlClient.execute(`INSERT INTO accounts(id, name, email, password) values(?,?,?,?)`, [
        v4.generate(),
        account.name,
        account.email,
        account.password
    ])
    
    return result
}

const signInRepo = async (account: Account) => {
    let result = await mysqlClient.query(`select name, email from accounts where email = ? and password = ?`,[account.email, account.password])
    if (result.length === 0){
        result = undefined
    }

    return result[0]
}

const existEmailRepo = async (email: string) => {
    let result = await mysqlClient.query(`select email from accounts where email = ?`,[email])
    if (result.length === 0){
        result = undefined
    }

    return result[0]
}
  
export { signUpRepo, signInRepo, existEmailRepo }
