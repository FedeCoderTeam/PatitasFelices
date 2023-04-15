const { user , session} = require ('../../database/db')
const jwt = require('jsonwebtoken')

const loginUser = async (email, password) => {
    if(!email || !password) throw new Error('Falta completar algún o algunos datos')

    const findUser = await user.findOne({where: {email}})

    if(!findUser) throw new Error('No se encuentra en la base de datos')
    if(findUser.isDisabled) throw new Error('Tu cuenta esta desactivada. Si crees que es un error comunicalo con algun staff.')

    if(findUser.email === email && findUser.password === password) {
        const token = jwt.sign({ user: findUser.dataValues}, "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHY/fLfFMx4BdEsj49b5SqdlY4Ls\n" +
            "cHk2Z8ui3fAPwAFQe9YtOnRFCP4A2IbmuXQgTt98HTNV8OAqsFoX9/zG1v8++WDj\n" +
            "uO+7n2tUY9pvN609L41oKYo0fmo2FVgP5xJMBzuEvHyCU7k9VgOstruEZgDOKxBE\n" +
            "1r2avOYVGbYCBIzZAgMBAAE", {expiresIn: '1h'})
        const findSession = await session.findOne({where: {userId: findUser.id}})
        if(findSession) {
            await session.update({token: token}, {where: {userId: findUser.id}})
        } else {
            await session.create({
                token: token,
                userId: findUser.id
            })
        }

        return {
            authenticated: true,
            token: token,
            user: {
                id: findUser.id,
                name: findUser.name,
                last: findUser.last,
                email: findUser.email,
                image: findUser.image,
                isVerified: findUser.isVerified,
            }
        }
    } else  throw new Error('El email o contraseña no son validos.')
}

module.exports= loginUser;