const { user, userVerification } = require ('../../database/db')
const { bcrypt, saltRounds } = require('../../utils/bcrypt')
const { signToken } = require('../../utils/token');
const { email_account_verification } = require('../../utils/email');

const registerUser = async (name, last, email, password) => {
    if(!name || !last || !email || !password) throw new Error('Se requiere nombre, apellido y contraseña.')
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Ingresa un correo electrónico válido.')

    const existUser = await user.findOne({where: {email}})

    if(existUser) throw new Error('Este correo ya se encuentra en uso. Ingresa un dirección de correo electrónico diferente.')

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await user.create({
        name: name,
        last: last,
        email: email,
        password: hashedPassword,
        roleId: 3
    })

    const token = await signToken({user: { id: newUser.id, email: newUser.email }}, process.env.JWT_PRIVATE_KEY_VERIFY, {expiresIn: '600000'})

    await userVerification.create({
        token: token,
        userId: newUser.id
    })

    await email_account_verification({name: newUser.name, email: newUser.email}, token)

    return {
        error: null,
        message: 'Se creó AuthForms. Debes verificar tu correo electrónico.'
    }
}

module.exports = registerUser;