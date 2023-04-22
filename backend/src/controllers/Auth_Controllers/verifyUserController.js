const { user, userVerification } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');

const verifyUser = async (token) => {
    if(!token) throw new Error('Token is required')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_VERIFY)

    const findUserVerification = await userVerification.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserVerification) throw new Error('No valid account verification request was found with this token')

    await user.update({ isVerified: true }, { where: { id: decoded.user.id, email: decoded.user.email } })
    await findUserVerification.destroy()

    return {
        error: null,
        message: 'Account verification successfully'
    }
}

module.exports = verifyUser;