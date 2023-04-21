require('dotenv').config();
const { user , session, role} = require ('../../database/db')
const {verifyToken} = require('../../utils/token');

//En progreso
const authUser = async (token) => {
    if(!token) throw new Error('You need token')

    const findSession = await session.findOne({where: {token: token}})
    if(!findSession) throw new Error('Your token does not exist')

    const findUser = await user.findOne({where: {id: findSession.userId}, include: [{model: role}]})
    if(!findUser) throw new Error('Your access has been lost. You need to log in again.')
    if(findUser.isDisabled) throw new Error('Your account has been disabled. If you believe this is an error, please contact a staff member')

    await verifyToken(findSession.token, process.env.JWT_PRIVATE_KEY_AUTH)

    return {
        authenticated: true,
        token: findSession.token,
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
}

module.exports= authUser;