const { user, role } = require ('../../database/db')

const {getAuth} = require('../../database/firebase')
const auth = require('firebase/auth')

const registerUser = async (name, last, email, password) => {
    if(!name || !last || !email || !password) throw new Error('Falta completar algún o algunos datos')

    const existUser = await user.findOne({where: {email}})

    if(existUser) throw new Error('El correo está en uso. Introduce otro correo electrónico')

    auth.createUserWithEmailAndPassword(getAuth(), email, password).then(async () => {
        auth.sendEmailVerification(getAuth().currentUser).then(() => {
            }).catch((error) => {
                throw new Error(error)
            })
        }
    ).catch((error) => {
        throw new Error(error)
    })

    await user.create({
        name: name,
        last: last,
        email: email,
        password: password,
        roleId: 3
    })

    return {
        error: null,
        message: 'Cuenta creada, debes verificar tu correo.'
    }
}

module.exports = registerUser;