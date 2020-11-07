import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.0.12/mod.ts'

class AccountModel extends Model {
    static table = 'accounts'
    static timestamps = true

    static fields = {
        id: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }
}

export { AccountModel }
