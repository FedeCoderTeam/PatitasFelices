const { session } = require ('../../database/db')

const logoutUser = async (id, token) => {
    if(!id || !token) throw new Error('Id and Token are required')

    const findSession = await session.findOne({where: {token: token, userId: id}})

    if(!findSession) throw new Error('No session was found for the provided id and token')

    findSession.destroy()

    return {
        error: null,
        authenticated: false,
        user: null
    }
}

module.exports = logoutUser;