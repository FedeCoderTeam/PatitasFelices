const { user , session, role, userVerification} = require ('../../database/db')
const { bcrypt } = require('../../utils/bcrypt');
const { signToken } = require('../../utils/token');
const { email_account_verification } = require('../../utils/email');

const loginUser = async (email, password) => {
    if(!email || !password) throw new Error('Email and Password are required')
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Please enter a valid email address')

    const findUser = await user.findOne({where: {email}, include: [{model: role}]})
    if(!findUser) throw new Error('The email address or password you entered is incorrect')
    if(findUser.isDisabled) throw new Error('Your account has been disabled. If you believe this is an error, please contact a staff member')

    const comparePassword = await bcrypt.compare(password, findUser.password)
    if(!comparePassword) throw new Error('The email address or password you entered is incorrect. Please verify your credentials and try again')

    if(!findUser.isVerified) {
        const tokenVerify = await signToken({ user: { id: findUser.id, email: findUser.email } }, process.env.JWT_PRIVATE_KEY_VERIFY, {expiresIn: '600000'})
        await userVerification.update({token: tokenVerify}, {where: {userId: findUser.id}})
        await email_account_verification({name: findUser.name, email: findUser.email}, tokenVerify)
        throw new Error('Your account is not verified. We will send you an email so you can verify it')
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