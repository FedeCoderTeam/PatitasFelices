const { user, role } = require ('../../database/db')

const recoveryPassword = async (email) => {
    if(!email) throw new Error('Required email')

    // await auth.sendPasswordResetEmail(getAuth(), email)

    return {
        error: null,
        message: 'We have sent an email to your address to reset your password'
    }
}

module.exports = recoveryPassword;