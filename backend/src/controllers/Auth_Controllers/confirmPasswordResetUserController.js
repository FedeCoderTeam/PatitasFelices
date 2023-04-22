const { user, userPasswordReset } = require ('../../database/db')
const { bcrypt, saltRounds } = require('../../utils/bcrypt')
const { verifyToken } = require('../../utils/token');

const confirmPasswordResetUser = async (token, password) => {
    if(!token || !password) throw new Error('Email and Password is required')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_PASSWORD_RESET)
    const findUserPasswordReset = await userPasswordReset.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserPasswordReset) throw new Error('No valid password reset request was found with this token')

    const findUser = user.findOne({where: { id: decoded.user.id, email: decoded.user.email }})
    if(!findUser) throw new Error('No valid password reset request was found with this token')

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    await user.update({password: hashedPassword}, {where: {id: decoded.user.id, email: decoded.user.email}})
    await findUserPasswordReset.destroy()

    return {
        error: null,
        message: 'Password reset successfully'
    }

}

module.exports = confirmPasswordResetUser;