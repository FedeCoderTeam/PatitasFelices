require('dotenv').config();
const { user , session, role} = require ('../../database/db')
const jwt = require('jsonwebtoken')

const {getAuth} = require('../../database/firebase')
const auth = require('firebase/auth')

const loginUser = async (email, password) => {
    if(!email || !password) throw new Error('Falta completar algún o algunos datos')

    const findUser = await user.findOne({where: {email}, include: [{model: role}]})

    if(!findUser) throw new Error('No se encuentra en la base de datos')
    if(findUser.isDisabled) throw new Error('Tu cuenta esta desactivada. Si crees que es un error comunicalo con algun staff.')

    const userFireBase = await auth.signInWithEmailAndPassword(getAuth(), email, password)
    if(!userFireBase.user.emailVerified) {
        await auth.sendEmailVerification(userFireBase.user)
        throw new Error('Tu cuenta no esta verificada, te enviaremos otro mail para que puedas verificar.')
    }

    if(findUser.email === email) {
        const token = jwt.sign({ user: findUser.dataValues}, process.env.JWT_PRIVATE_KEY, {expiresIn: '6h'})
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
            authenticated: true,
            token: token,
            user: {
                id: findUser.id,
                name: findUser.name,
                last: findUser.last,
                email: findUser.email,
                image: findUser.image,
                isVerified: userFireBase.user.emailVerified,
                role: findUser.role.name
            }
        }
    } else  throw new Error('El email o contraseña no son validos.')
}

module.exports= loginUser;