const { user, userPasswordReset } = require ('../../database/db')
const { bcrypt, saltRounds } = require('../../utils/bcrypt')
const { verifyToken } = require('../../utils/token');

const confirmPasswordResetUser = async (token, password) => {
    if(!token || !password) throw new Error('Se requiere un email y una contraseña.')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_PASSWORD_RESET)
    const findUserPasswordReset = await userPasswordReset.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserPasswordReset) throw new Error('No se encontró ninguna solicitud para reestablecer la contraseña con este token.')

    const findUser = user.findOne({where: { id: decoded.user.id, email: decoded.user.email }})
    if(!findUser) throw new Error('No se encontró ninguna solicitud para reestablecer la contraseña con este token.')

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    await user.update({password: hashedPassword}, {where: {id: decoded.user.id, email: decoded.user.email}})
    await findUserPasswordReset.destroy()

    return {
        error: null,
        message: 'Se reestableció la contraseña exitosamente.'
    }

}

module.exports = confirmPasswordResetUser;