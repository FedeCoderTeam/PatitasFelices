require('dotenv').config();
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

    jwt.verify(findSession.token, process.env.JWT_PRIVATE_KEY, function (err) {
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