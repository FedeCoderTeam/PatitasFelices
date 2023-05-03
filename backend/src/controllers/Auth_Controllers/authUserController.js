const { user, session, role } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');

const authUser = async (token) => {
    if(!token) throw new Error('Se requiere el Token')

    const findSession = await session.findOne({where: {token: token}})
    if(!findSession) throw new Error('Se perdió tu acceso. Tienes que volver a ingresar.')

    const findUser = await user.findOne({where: {id: findSession.userId}, include: [{model: role}]})
    if(!findUser) throw new Error('Se perdió tu acceso. Tienes que volver a ingresar.')
    if(findUser.isDisabled) throw new Error('Tu cuenta ha sido deshabilitada. Si crees que ha sido un error, comúnicate con los miembros del personal.')

    await verifyToken(findSession.token, process.env.JWT_PRIVATE_KEY_AUTH)

    return {
        error: null,
        authenticated: true,
        token: findSession.token,
        user: {
            id: findUser.id,
            googleId: findUser.googleId,
            name: findUser.name,
            last: findUser.last,
            email: findUser.email,
            image: findUser.image,
            isVerified: findUser.isVerified,
            role: findUser.role.name
        }
    }
}

module.exports = authUser;