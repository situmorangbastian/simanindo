
import { Status } from "https://deno.land/std/http/http_status.ts"

import { Request, Response } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import vs from "https://deno.land/x/value_schema/mod.ts"

import { signUpRepo, signInRepo } from '././repository/account.ts'
import Account from './interface.ts'

const validateFieldObject = {
    name: vs.string(),
    email: vs.email(),
    password: vs.string(),
}

const signUpHandler = async ({ request, response }: { request: Request, response: Response }) => {
    const body = await request.body()
    const account: Account = body.value

    try {
        vs.applySchemaObject(validateFieldObject, account, (e) => {
            const key = e.keyStack.shift()
            if(key !== undefined) {
                response.body = {message:"invalid "+key}
                response.status = Status.BadRequest.valueOf()
                throw(response)
            } 
        })
    } catch (response) {
       return
    }

    try {
        const result = await signUpRepo(account)
        response.body = result
        response.status = Status.Created.valueOf()
    } catch (e) {
        throw new Error(e)
    }
}

const signInHandler = async ({ request, response }: { request: Request, response: Response }) => {
    const body = await request.body()
    const account: Account = body.value

    try {
        if (account.email == undefined || account.password == undefined) {
            response.status = Status.BadRequest.valueOf()
            response.body = {message: "email and password is required" }
            return
        }

        const result = await signInRepo(account)
        response.body = result
        response.status = Status.OK.valueOf()
    } catch (e) {
        throw new Error(e)
    }
}

export { signUpHandler, signInHandler}