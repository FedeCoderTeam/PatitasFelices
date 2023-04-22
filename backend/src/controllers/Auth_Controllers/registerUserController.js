const { user, userVerification } = require ('../../database/db')
const { bcrypt, saltRounds } = require('../../utils/bcrypt')
const { signToken } = require('../../utils/token');
const { email_account_verification } = require('../../utils/email');

const registerUser = async (name, last, email, password) => {
    if(!name || !last || !email || !password) throw new Error('Name, Last, Email and Password are required')
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Please enter a valid email address')

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

    const token = await signToken({user: { id: newUser.id, email: newUser.email }}, process.env.JWT_PRIVATE_KEY_VERIFY, {expiresIn: '600000'})

    await userVerification.create({
        token: token,
        userId: newUser.id
    })

    await email_account_verification({name: newUser.name, email: newUser.email}, token)

    return {
        error: null,
        message: 'AuthForms created, you must verify your email'
    }
}

module.exports = registerUser;