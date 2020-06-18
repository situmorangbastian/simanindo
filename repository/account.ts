import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Account, 
    ErrInternalServer, 
} from "../entity.ts"
import { AccountModel } from "../repository/model.ts"

const signUpRepo = async (account: Account) => {
    try {
        await AccountModel.create({
            id:  v4.generate(),
            name: account.name,
            email: account.email,
            password: account.password
        })

        return {
            name: account.name,
            email: account.email,
        }  
    } catch (e) {
        console.log(e)
        return {
            message: ErrInternalServer
        }
    }
}

const signInRepo = async (account: Account) => {
    try {
        const data = await AccountModel.select('name', 'email').
            where('email','=', account.email). 
            where('password', '=', account.password).
            first()

        return data
    } catch (e) {
        console.log(e)
        return {
            message: ErrInternalServer
        }
    }
}

const existEmailRepo = async (email: string) => {
    try {
        const data = await AccountModel.select('email').
            where('email','=', email).
            first()

        return data
    } catch (e) {
        console.log(e)
        return {
            message: ErrInternalServer
        }
    }
}
  
export { signUpRepo, signInRepo, existEmailRepo }
