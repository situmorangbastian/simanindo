import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { signUpHandler, signInHandler } from './handler.ts'

const router = new Router()

router.get('/jarvis', (context) => {
	context.response.body = 'ok'
})
router.post('/accounts/signup', signUpHandler)
router.post('/accounts/signin', signInHandler)

export {router}