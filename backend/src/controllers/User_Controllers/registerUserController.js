const { user, userVerification } = require ('../../database/db')
const { bcrypt, saltRounds } = require('../../utils/bcrypt')
const {signToken} = require('../../utils/token');
const {email_verification} = require('../../utils/email');

const registerUser = async (name, last, email, password) => {
    if(!name || !last || !email || !password) throw new Error('Name, last, email and password are required')

    const existUser = await user.findOne({where: {email}})

    if(existUser) throw new Error('The email is already in use. Please enter a different email address')

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await user.create({
        name: name,
        last: last,
        email: email,
        password: hashedPassword,
        roleId: 3
    })

    const token = await signToken({user:
            {
                id: newUser.id,
                email: newUser.email
            }
    }, process.env.JWT_PRIVATE_KEY_VERIFY, {expiresIn: '600000'})

    await userVerification.create({
        token: token,
        userId: newUser.id
    })

    //Evento de enviar un correo para verificación de cuenta
    await email_verification({name: newUser.name, email: newUser.email}, token)
    // await eventMail();
    //...

    return {
        error: null,
        message: 'Account created, you must verify your email'
    }
}

module.exports = registerUser;