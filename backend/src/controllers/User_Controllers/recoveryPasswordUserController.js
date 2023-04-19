const { user, role } = require ('../../database/db')

const {getAuth} = require('../../database/firebase')
const auth = require('firebase/auth')

const recoveryPassword = async (email) => {
    if(!email) throw new Error('Necesitas mail')

    await auth.sendPasswordResetEmail(getAuth(), email)

    return {
        error: null,
        message: 'Ya enviamos un mail a tu correo para recuperar contraseña'
    }
}

module.exports = recoveryPassword;