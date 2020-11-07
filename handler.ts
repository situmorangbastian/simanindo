import { Status } from "https://deno.land/std/http/http_status.ts"

import { Router, Context } from 'https://deno.land/x/oak@v6.3.1/mod.ts'

import { signUp, signIn } from './usecase.ts'
import { 
    Account, 
    ErrNotFound, 
    ErrInternalServer, 
    ErrEmailDuplicate,
    validatorSchema, 
    validator 
} from "./entity.ts"

const signUpHandler = async (ctx: Context) => {
    if (!ctx.request.hasBody) {
        ctx.response.status = Status.BadRequest
        ctx.response.body = {
            "message": "body is required"
        }
        return
    }
  
    const body = ctx.request.body();
    if (body.type !== "json") {
        ctx.response.status = Status.BadRequest
        ctx.response.body = {
            "message": "body is must content type application/json"
        }
        return
    }

    const value = await body.value;
    const account: Account = {
        name: value.name,
        email: value.email,
        password: value.password,
    }

    try {
        validator.applySchemaObject(validatorSchema, account, (e) => {
            const key = e.keyStack.shift()
            if(key !== undefined) {
                ctx.response.body = { error:"invalid "+key }
                ctx.response.status = Status.BadRequest
                throw(ctx)
            } 
        })
    } catch (response) {
       return
    }

    const result = await signUp(account)
    ctx.response.body = result

    switch(result.error) { 
        case ErrEmailDuplicate:{
            ctx.response.status = Status.Conflict
            return 
        }
        case ErrInternalServer:{ 
            ctx.response.status = Status.InternalServerError
            return
        }
    }

    ctx.response.status = Status.Created
}

const signInHandler = async (ctx: Context) => {
    if (!ctx.request.hasBody) {
        ctx.response.status = Status.BadRequest
        ctx.response.body = {
            "message": "body is required"
        }
        return
    }
  
    const body = ctx.request.body();
    if (body.type !== "json") {
        ctx.response.status = Status.BadRequest
        ctx.response.body = {
            "message": "body is must content type application/json"
        }
        return
    }

    const value = await body.value;
    const account: Account = {
        name: value.name,
        email: value.email,
        password: value.password,
    }

    if (account.email == undefined || account.password == undefined) {
        ctx.response.status = Status.BadRequest
        ctx.response.body = { error: "email and password is required" }
        return
    }

    const result = await signIn(account)
    ctx.response.body = result

    switch(result.error){ 
        case ErrNotFound:{ 
            ctx.response.status = Status.NotFound.valueOf()
            return 
        }
        case ErrEmailDuplicate:{
            ctx.response.status = Status.Conflict.valueOf()
            return 
        } 
        case ErrInternalServer:{ 
            ctx.response.status = Status.InternalServerError.valueOf()
            return
        }
    }
    
    ctx.response.status = Status.OK
}

const router = new Router()

router.get('/health', (context) => {
	context.response.body = 'ok'
})
router.post('/accounts/signup', signUpHandler)
router.post('/accounts/signin', signInHandler)

export { router }
