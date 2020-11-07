import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Account, 
} from "../entity.ts"
import { AccountModel } from "../repository/model.ts"

const signUpRepo = async (account: Account) => {
    await AccountModel.create({
        id:  v4.generate(),
        name: account.name,
        email: account.email,
        password: account.password
    })
}

const signInRepo = async (account: Account) => {
    return await AccountModel.select('name', 'email').
        where('email','=', account.email). 
        where('password', '=', account.password).
        first()
}

const existEmailRepo = async (email: string) => {
    return await AccountModel.select('email').
        where('email','=', email).
        first()
}
  
export { signUpRepo, signInRepo, existEmailRepo }
