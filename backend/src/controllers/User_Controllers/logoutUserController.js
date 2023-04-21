const { session} = require ('../../database/db')

const logoutUser = async (id, token) => {
    if(!id || !token) throw new Error('Id and token required')

    const findSession = await session.findOne({where: {token: token, userId: id}})

    if(!findSession) throw new Error('No exist your id')

    findSession.destroy()

    return {
        authenticated: false,
        user: null
    }
}

module.exports = logoutUser;