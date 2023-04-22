const { user, userVerification} = require ('../../database/db')
const {bcrypt} = require('../../utils/bcrypt');
const {signToken, verifyToken} = require('../../utils/token');
const {email_verification} = require('../../utils/email');

const verifyUser = async (token) => {
    if(!token) throw new Error('Token required')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_VERIFY)

    const findUserVerification = await userVerification.findOne({where: { token: token, userId: decoded.user.id }})
    if(!findUserVerification) throw new Error('Error, it was not found.')

    await user.update({ isVerified: true }, { where: { id: decoded.user.id } })
    await findUserVerification.destroy()

    return {
        error: null,
        message: 'Account verification successfully'
    }
}

module.exports = verifyUser;