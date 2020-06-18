import vs from "https://deno.land/x/value_schema/mod.ts"

interface Account {
    name: string
    email: string
    password: string
}

const ErrNotFound = "not found"
const ErrInternalServer = "internal server error"
const ErrEmailDuplicate = "email already exists"

const validateFieldObject = {
    name: vs.string(),
    email: vs.email(),
    password: vs.string(),
}

export { 
    vs,
    Account, 
    ErrNotFound,
    ErrInternalServer,
    ErrEmailDuplicate,
    validateFieldObject,
}
