const { user , session} = require ('../../database/db')
const jwt = require('jsonwebtoken')

const loginUser = async (email, password) => {
    if(!email || !password) {
        throw new Error('Falta completar algún o algunos datos')
    }
    const findUser = await user.findOne({where: {email}})

    if(!findUser) {
        throw new Error('No se encuentra en la base de datos')
    }

    if(findUser.email === email && findUser.password === password) {
        const token = jwt.sign({findUser}, "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHY/fLfFMx4BdEsj49b5SqdlY4Ls\n" +
            "cHk2Z8ui3fAPwAFQe9YtOnRFCP4A2IbmuXQgTt98HTNV8OAqsFoX9/zG1v8++WDj\n" +
            "uO+7n2tUY9pvN609L41oKYo0fmo2FVgP5xJMBzuEvHyCU7k9VgOstruEZgDOKxBE\n" +
            "1r2avOYVGbYCBIzZAgMBAAE", {expiresIn: '1h'})
        await session.create({
            token: token,
            userId: findUser.id
        })
        return token
    } else {
        throw new Error('El email o contraseña no son validos.')
    }
}

//En progreso
const authUser = async (token) => {
    if(!token) throw new Error('You need token')

    const findSession = await session.findOne({where: {token: token}})
    if(!findSession) throw new Error('No exist you token')

    const findUser = await user.findOne({where: {id: findSession.id}})
    if(!findUser) throw new Error('Not authorized')
    jwt.verify(findSession.token, "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHY/fLfFMx4BdEsj49b5SqdlY4Ls\n" +
        "cHk2Z8ui3fAPwAFQe9YtOnRFCP4A2IbmuXQgTt98HTNV8OAqsFoX9/zG1v8++WDj\n" +
        "uO+7n2tUY9pvN609L41oKYo0fmo2FVgP5xJMBzuEvHyCU7k9VgOstruEZgDOKxBE\n" +
        "1r2avOYVGbYCBIzZAgMBAAE", function (err) {
        if(err) {
            throw new Error(err)
        }
    })
};

module.exports= loginUser;