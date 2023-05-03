const { user, userVerification, role, session } = require ('../../database/db')
const { verifyToken, signToken} = require('../../utils/token');
const { event_successful_registration } = require('../../utils/email');

const verifyUser = async (token) => {
    if(!token) throw new Error('Se requiere un Token.')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_VERIFY)

    const findUserVerification = await userVerification.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserVerification) throw new Error('No se encontró ninguna solicitud de verificación de cuenta válida con este Token.')

    await user.update({ isVerified: true }, { where: { id: decoded.user.id, email: decoded.user.email } })
    await findUserVerification.destroy()

    const findUser = await user.findOne({where: {id: decoded.user.id}, include: [{model: role}], attributes: { exclude: ["password"] }})
    const tokenUser = await signToken({user: findUser.dataValues }, process.env.JWT_PRIVATE_KEY_AUTH, {expiresIn: '24h'})

    await session.create({
        token: tokenUser,
        userId: decoded.user.id
    })

    await event_successful_registration({name: findUser.name, email: findUser.email})

    return {
        error: null,
        message: 'Verificación de cuenta exitosa.',
        authenticated: true,
        token: tokenUser,
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

module.exports = verifyUser;