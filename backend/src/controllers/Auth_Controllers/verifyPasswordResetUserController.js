const { userPasswordReset } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');

const verifyPasswordResetUser = async (token) => {
    if(!token) throw new Error('Se requiere un Token')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_PASSWORD_RESET)

    const findUserVerifyPasswordReset = await userPasswordReset.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserVerifyPasswordReset) throw new Error('No se encontró ninguna solicitud válida para reestablecer la contraseña con este Token')

    return {
        error: null,
        message: 'Autorizado'
    }
}

module.exports = verifyPasswordResetUser