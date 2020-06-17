import { Account } from "./entity.ts"
import { signUpRepo, signInRepo } from './repository/account.ts'

const signUp = async (account: Account) => {
    const result = await signUpRepo(account)
    return result
}

const signIn = async (account: Account) => {
   const result = await signInRepo(account)
   return result
}

export { signUp, signIn }