const { user, role } = require ('../../database/db')

const {getAuth} = require('../../database/firebase')
const auth = require('firebase/auth')

const userGoogleController = async () => {
    const provider = new auth.GoogleAuthProvider()
    const user = await auth.signInWithPopup(getAuth(), provider)
    console.log(user)
}

module.exports = userGoogleController;