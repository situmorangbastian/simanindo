import { v4 } from "https://deno.land/std/uuid/mod.ts"

import Account from "../interface.ts"
import { ErrInternalServer, ErrNotFound } from "../error.ts"
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
        let data = await AccountModel.select('name', 'email').
            where('email','=', account.email). 
            where('password', '=', account.password).
            first()
            
        if (data == undefined){
            data = {
                message: ErrNotFound,
            }
        }

        return data
    } catch (e) {
        console.log(e)
        return {
            message: ErrInternalServer
        }
    }
}
  
export { signUpRepo, signInRepo }