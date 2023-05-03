const { user } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');
const {bcrypt, saltRounds} = require('../../utils/bcrypt');

const updatePasswordUser = async (token, currentPassword, newPassword) => {
    if(!token) throw new Error('Token is required')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_AUTH)

    const findUser = await user.findOne({where: { id: decoded.user.id, email: decoded.user.email }})
    if(!findUser) throw new Error('User not found')

    if(findUser.googleId) throw new Error('Password reset not available for Google accounts')

    const comparePassword = await bcrypt.compare(currentPassword, findUser.password)
    if(!comparePassword) throw new Error('Your current password is incorrect')

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    await user.update({password: hashedPassword}, {where: {id: findUser.id, email: findUser.email}})

    return {
        error: null,
        message: 'Password updated successfully'
    }
}

module.exports = updatePasswordUser