const { userPasswordReset } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');

const verifyPasswordResetUser = async (token) => {
    if(!token) throw new Error('Token is required')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_PASSWORD_RESET)

    const findUserVerifyPasswordReset = await userPasswordReset.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserVerifyPasswordReset) throw new Error('No valid password reset request was found with this token')

    return {
        error: null,
        validate: true,
        message: 'Granted for password change'
    }
}

module.exports = verifyPasswordResetUser