const { user , session, role} = require ('../../database/db')
const jwt = require('jsonwebtoken')

//En progreso
const authUser = async (token) => {
    if(!token) throw new Error('You need token')

    const findSession = await session.findOne({where: {token: token}})
    if(!findSession) throw new Error('No exist you token')

    const findUser = await user.findOne({where: {id: findSession.userId}, include: [{model: role}]})
    if(!findUser) throw new Error('Not authorized')
    if(findUser.isDisabled) throw new Error('Tu cuenta esta desactivada. Si crees que es un error comunicalo con algun staff.')

    jwt.verify(findSession.token, "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHY/fLfFMx4BdEsj49b5SqdlY4Ls\n" +
        "cHk2Z8ui3fAPwAFQe9YtOnRFCP4A2IbmuXQgTt98HTNV8OAqsFoX9/zG1v8++WDj\n" +
        "uO+7n2tUY9pvN609L41oKYo0fmo2FVgP5xJMBzuEvHyCU7k9VgOstruEZgDOKxBE\n" +
        "1r2avOYVGbYCBIzZAgMBAAE", function (err) {
        if(err) {
            findSession.destroy()
            throw new Error(err)
        }
    })
    return {
        authenticated: true,
        token: findSession.token,
        user: {
            id: findUser.id,
            name: findUser.name,
            last: findUser.last,
            email: findUser.email,
            image: findUser.image,
            isVerified: findUser.isVerified,
            role: findUser.role.name
        }
    }
}

module.exports= authUser;