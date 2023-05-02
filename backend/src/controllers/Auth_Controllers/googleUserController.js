const { user, role, session } = require ('../../database/db')
const { signToken } = require('../../utils/token');
const { bcrypt, saltRounds} = require('../../utils/bcrypt');
const { generatorPassword } = require('../../utils/generatorPassword')
const { email_google } = require('../../utils/email');

const googleUser = async (profile) => {
    const googleId = profile.id
    const name = profile.name.givenName
    const last = profile.name.familyName
    const email = profile.emails[0].value
    const isVerified = profile.emails[0].verified
    const image = profile.photos[0].value

    const findUser = await user.findOne({where: {email}, include: [{model: role}]})

    if(findUser) {
        if(findUser.googleId) {
            const token = await signToken({user: findUser.dataValues}, process.env.JWT_PRIVATE_KEY_AUTH, {expiresIn: '6h'})
            const findSession = await session.findOne({where: {userId: findUser.id}})

            if(findSession) await session.update({token: token}, {where: {userId: findUser.id}})
            else await session.create({token: token, userId: findUser.id})
            return {
                error: null,
                authenticated: true,
                token: token,
                user: {
                    id: findUser.id,
                    googleId: findUser.googleId,
                    name: findUser.name,
                    last: findUser.last,
                    email: findUser.email,
                    image: findUser.image,
                    isVerified: findUser.isVerified,
                    role: findUser.role.name
                }
            }
        } else throw new Error('A user with that email already exists. Please login with your normal email and password.')
    } else {
        const hashedPassword = await bcrypt.hash(generatorPassword(), saltRounds)
        const newUser = await user.create({
            googleId: googleId,
            name: name,
            last: last,
            email: email,
            password: hashedPassword,
            image: image,
            isVerified: isVerified,
            roleId: 3
        })
        const token = await signToken({user: newUser.dataValues }, process.env.JWT_PRIVATE_KEY_AUTH, {expiresIn: '6h'})
        const findSession = await session.findOne({where: {userId: newUser.id}})

        if(findSession) await session.update({token: token}, {where: {userId: newUser.id}})
        else await session.create({token: token, userId: newUser.id})

        const userinfo = await user.findOne({where: {id: newUser.id}, include: [{model: role}]})

        await email_google({name: newUser.name, email: newUser.email})

        return {
            error: null,
            authenticated: true,
            token: token,
            user: {
                id: userinfo.id,
                googleId: userinfo.googleId,
                name: userinfo.name,
                last: userinfo.last,
                email: userinfo.email,
                image: userinfo.image,
                isVerified: userinfo.isVerified,
                role: userinfo.role.name
            }
        }
    }
}

module.exports = googleUser