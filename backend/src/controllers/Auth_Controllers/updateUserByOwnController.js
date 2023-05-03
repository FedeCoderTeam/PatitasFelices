const { user, session, role } = require('../../database/db')
const { verifyToken, signToken } = require('../../utils/token')

const updateUserByOwn = async (token, name, last, image) => {
    if(!token) throw new Error('Se requiere token')

    await verifyToken(token, process.env.JWT_PRIVATE_KEY_AUTH)

    const findSession = await session.findOne({where: {token: token}})
    if(!findSession) throw new Error('Se perdió tu acceso. Tienes que volver a ingresar.')

    const findUser = await user.findOne({where: {id: findSession.userId}, include: [{model: role}]})
    if(!findUser) throw new Error('No se encontró el usuario.')

    await findUser.update({
        name,
        last,
        image
    })

    const  userUpdated = await user.findOne({where: {id: findSession.userId}, include: [{model: role}]})


    const objUser = {
        id: userUpdated.id,
        googleId: userUpdated.googleId,
        name: userUpdated.name,
        last: userUpdated.last,
        email: userUpdated.email,
        image: userUpdated.image,
        isVerified: userUpdated.isVerified,
        role: userUpdated.role.name
    }

    const tokenNew = await signToken({user: objUser}, process.env.JWT_PRIVATE_KEY_AUTH, {expiresIn: '24h'})
    await session.update({token: tokenNew}, {where: {userId: userUpdated.id}})

    return {
        error: null,
        authenticated: true,
        token: tokenNew,
        user: objUser
    }

}

module.exports = updateUserByOwn