require('dotenv').config();
const { user, role, session} = require ('../../database/db')

// const admin = require('../../config/firebaseAdmin')
const jwt = require('jsonwebtoken');

const userGoogle = async (tokenGoogle) => {
    if(!tokenGoogle) throw new Error('Necesitas el Token de Google.')

    // const userGoogle = await admin.auth().verifyIdToken(tokenGoogle)
    const findUser = await user.findOne({where: {email: userGoogle.email}, include: [{model: role}]})
    let userCurrent;
    if(!findUser) {
        const [name, ...last] = userGoogle.name.split(' ')
        await user.create({
            name: name,
            last: last.join(' '),
            email: userGoogle.email,
            roleId: 3
        })
        userCurrent = await user.findOne({where: {email: userGoogle.email}, include: [{model: role}]})
    } else {
        userCurrent = findUser
    }

    if(userCurrent.isDisabled) throw new Error('Tu cuenta esta desactivada. Si crees que es un error comunicalo con algun staff.')

    const token = jwt.sign({ user: userCurrent.dataValues}, process.env.JWT_PRIVATE_KEY, {expiresIn: '6h'})
    const findSession = await session.findOne({where: {userId: userCurrent.id}})

    if(findSession) {
        await session.update({token: token}, {where: {userId: userCurrent.id}})
    } else {
        await session.create({
            token: token,
            userId: userCurrent.id
        })
    }

    return {
        authenticated: true,
        token: token,
        user: {
            id: userCurrent.id,
            name: userCurrent.name,
            last: userCurrent.last,
            email: userCurrent.email,
            image: userCurrent.image,
            isVerified: userGoogle.email_verified,
            role: userCurrent.role.name
        }
    }
}

module.exports = userGoogle;