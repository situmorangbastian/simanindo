import vs from "https://deno.land/x/value_schema/mod.ts"

interface Account {
    name: string
    email: string
    password: string
}

const ErrNotFound = "not found"
const ErrInternalServer = "internal server error"
const ErrEmailDuplicate = "email already exists"

const validator = vs

const validatorSchema = {
    name: validator.string(),
    email: validator.email(),
    password: validator.string(),
}

export { 
    validator,
    Account, 
    ErrNotFound,
    ErrInternalServer,
    ErrEmailDuplicate,
    validatorSchema,
}
