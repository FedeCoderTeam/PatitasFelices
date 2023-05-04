const { user , session, role, userVerification} = require ('../../database/db')
const { bcrypt } = require('../../utils/bcrypt');
const { signToken } = require('../../utils/token');
const { email_account_verification } = require('../../utils/email');

const loginUser = async (email, password) => {
    if(!email || !password) throw new Error('Se requiere un correo electrónico y una contraseña.')
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Ingresa una dirección de correo electrónico válida.')

    const findUser = await user.findOne({where: {email}, include: [{model: role}]})
    if(!findUser) throw new Error('La dirección de correo o la contraseña que ingresaste son incorrectas.')
    if(findUser.isDisabled) throw new Error('Tu cuenta ha sido deshabilitada. Si crees que esto es un error, comunícate con un miembro del personal.')

    const comparePassword = await bcrypt.compare(password, findUser.password)
    if(!comparePassword) throw new Error('La dirección de correo o la contraseña que ingresaste son incorrectas. verifica tus credenciales e inténtalo nuevamente.')

    if(!findUser.isVerified) {
        const tokenVerify = await signToken({ user: { id: findUser.id, email: findUser.email } }, process.env.JWT_PRIVATE_KEY_VERIFY, {expiresIn: '600000'})
        await userVerification.update({token: tokenVerify}, {where: {userId: findUser.id}})
        await email_account_verification({name: findUser.name, email: findUser.email}, tokenVerify)
        throw new Error('Tu cuenta no ha sido verificada. Te enviaremos un correo electrónico para que puedas verificarla.')
    }

    const objUser = {
        id: findUser.id,
        googleId: findUser.googleId,
        name: findUser.name,
        last: findUser.last,
        email: findUser.email,
        image: findUser.image,
        isVerified: findUser.isVerified,
        role: findUser.role.name
    }

    const token = await signToken({ user: objUser }, process.env.JWT_PRIVATE_KEY_AUTH, {expiresIn: '24h'})
    const findSession = await session.findOne({where: {userId: findUser.id}})

    if(findSession) {
        await session.update({token: token}, {where: {userId: findUser.id}})
    } else {
        await session.create({
            token: token,
            userId: findUser.id
        })
    }

    return {
        error: null,
        authenticated: true,
        token: token,
        user: objUser
    }
}

module.exports= loginUser;