import { createHash } from "https://deno.land/std/hash/mod.ts";

import { Account, ErrNotFound, ErrEmailDuplicate } from "./entity.ts"
import { signUpRepo, signInRepo, existEmailRepo } from './repository/account.ts'

const signUp = async (account: Account) => {
    const existEmail = await existEmailRepo(account.email)
    if (existEmail !== undefined){
        return {
            message: ErrEmailDuplicate
        }
    }

    const hash = createHash("md5");
    hash.update(account.password);
    account.password = hash.toString()

    const result = await signUpRepo(account)
    return result
}

const signIn = async (account: Account) => {
    const hash = createHash("md5");
    hash.update(account.password);
    account.password = hash.toString()

    let result = await signInRepo(account)

    if (result == undefined){
        result = {
            message: ErrNotFound,
        }
    }
    
    return result
}

export { signUp, signIn }
