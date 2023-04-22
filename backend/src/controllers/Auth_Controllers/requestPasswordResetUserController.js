const { user, userPasswordReset } = require ('../../database/db')
const { signToken } = require('../../utils/token');
const { email_reset_password } = require('../../utils/email');

const requestPasswordResetUser = async (email) => {
    if(!email) throw new Error('Email is required')
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Please enter a valid email address')

    const findUser = await user.findOne({ where: {email: email} })

    if(!findUser) throw new Error('We\'re sorry. We weren\'t able to identify you given the information provided.')

    if(findUser.googleId) throw new Error('Password reset not available for Google accounts')

    const token = await signToken({user: {id: findUser.id, email: findUser.email}}, process.env.JWT_PRIVATE_KEY_PASSWORD_RESET, {expiresIn: '900000'})

    await userPasswordReset.create({
        token: token,
        userId: findUser.id
    })

    await email_reset_password({name: findUser.name, email: findUser.email}, token)

    return {
        error: null,
        message: 'You have requested password reset, check your email'
    }

}

module.exports = requestPasswordResetUser