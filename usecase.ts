import { createHash } from "https://deno.land/std/hash/mod.ts"

import { Context } from 'https://deno.land/x/oak@v6.3.1/mod.ts'

import { Account, ErrNotFound, ErrEmailDuplicate, ErrInternalServer } from "./entity.ts"
import { signUpRepo, signInRepo, existEmailRepo } from './repository/account.ts'

const signUp = async (account: Account) => {
    try {
        const result = await existEmailRepo(account.email)
        if (result !== undefined) {
            return {
                error: ErrEmailDuplicate
            }
        }
    } catch(e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }

    const hash = createHash("md5")
    hash.update(account.password)
    account.password = hash.toString()

    try {
        const result = await signUpRepo(account)
        if (result.affectedRows === 1){
            return {
                name: account.name,
                email: account.email,
            }
        }
    } catch(e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }
}

const signIn = async (account: Account) => {
    const hash = createHash("md5")
    hash.update(account.password)
    account.password = hash.toString()

    try {
        const result = await signInRepo(account)
        if (result === undefined) {
            return {
                error: ErrNotFound,
            }
        }
        return result
    } catch(e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }
}

export { signUp, signIn }
