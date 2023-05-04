const { user, userPasswordReset } = require ('../../database/db')
const { signToken } = require('../../utils/token');
const { email_reset_password } = require('../../utils/email');

const requestPasswordResetUser = async (email) => {
    if(!email) throw new Error('Se requiere un correo electrónico.')
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Ingresa un correo electrónico válido.')

    const findUser = await user.findOne({ where: {email: email} })

    if(!findUser) throw new Error('Lo sentimos. No pudimos identificarte con la información provista.')

    // if(findUser.googleId) throw new Error('No está disponible el reestablecimiento de contraseña para las cuentas de Google.')
    if(findUser.googleId) { return {
        error: null,
        message: 'Redirigiendo a Google...',
        redirectUrl: 'https://accounts.google.com/'
      };
    }

    const token = await signToken({user: {id: findUser.id, email: findUser.email}}, process.env.JWT_PRIVATE_KEY_PASSWORD_RESET, {expiresIn: '900000'})

    await userPasswordReset.create({
        token: token,
        userId: findUser.id
    })

    await email_reset_password({name: findUser.name, email: findUser.email}, token)

    return {
        error: null,
        message: 'Has solicitado reestablecer tu contraseña. Verifica tu correo electrónico.'
    }

}

module.exports = requestPasswordResetUser