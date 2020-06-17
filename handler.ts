
import { Status } from "https://deno.land/std/http/http_status.ts"

import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { Request, Response } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { signUp, signIn } from './usecase.ts'
import { 
    Account, 
    ErrNotFound, 
    ErrInternalServer, 
    validateFieldObject, 
    vs 
} from "./entity.ts"

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

    const result = await signUp(account)
    response.body = result
    switch(result.message) { 
        case ErrNotFound: { 
           response.status = Status.NotFound.valueOf()
           return 
        } 
        case ErrInternalServer: { 
            response.status = Status.InternalServerError.valueOf()
            return
        }
    }
    response.status = Status.Created.valueOf()
}

const signInHandler = async ({ request, response }: { request: Request, response: Response }) => {
    const body = await request.body()
    const account: Account = body.value

    if (account.email == undefined || account.password == undefined) {
        response.status = Status.BadRequest.valueOf()
        response.body = {message: "email and password is required" }
        return
    }

    const result = await signIn(account)
    response.body = result
    switch(result.message) { 
        case ErrNotFound: { 
           response.status = Status.NotFound.valueOf()
           return 
        } 
        case ErrInternalServer: { 
            response.status = Status.InternalServerError.valueOf()
            return
        }
    }

    response.status = Status.OK.valueOf()
}

const router = new Router()

router.get('/jarvis', (context) => {
	context.response.body = 'ok'
})
router.post('/accounts/signup', signUpHandler)
router.post('/accounts/signin', signInHandler)

export { router }