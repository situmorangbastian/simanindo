import vs from "https://deno.land/x/value_schema/mod.ts"

interface Account {
    name: string
    email: string
    password: string
}

const ErrNotFound = "Not Found"
const ErrInternalServer = "Internal Server Error"

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
    validateFieldObject,
}