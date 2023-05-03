const { session } = require ('../../database/db')

const logoutUser = async (id, token) => {
    if(!id || !token) throw new Error('Se requiere Id y Token.')

    const findSession = await session.findOne({where: {token: token, userId: id}})

    if(!findSession) throw new Error('No se enocntró una sesión para el Id y Token provistos.')

    findSession.destroy()

    return {
        error: null,
        authenticated: false,
        user: null
    }
}

module.exports = logoutUser;