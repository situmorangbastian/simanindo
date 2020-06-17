import { v4 } from "https://deno.land/std/uuid/mod.ts"

import Account from "../interface.ts"
import { AccountModel } from "../repository/model.ts"

const signUpRepo = async (account: Account) => {
    try {
        await AccountModel.create({
            id:  v4.generate(),
            name: account.name,
            email: account.email,
            password: account.password
        });

        return {
            name: account.name,
            email: account.email,
        }  
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

const signInRepo = async (account: Account) => {
    try {
        const data = await AccountModel.select('name', 'email').
            where('email','=', account.email). 
            where('password', '=', account.password).
            first();
        
        return {
            name: data.name,
            email: data.email,
        }  
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
  
export { signUpRepo, signInRepo }