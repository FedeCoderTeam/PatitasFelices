const { user } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');
const {bcrypt, saltRounds} = require('../../utils/bcrypt');

const updatePasswordUser = async (token, currentPassword, newPassword) => {
    if(!token) throw new Error('Se requiere un Token.')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_AUTH)

    const findUser = await user.findOne({where: { id: decoded.user.id, email: decoded.user.email }})
    if(!findUser) throw new Error('No se encontró el usuario.')

    if(findUser.googleId) throw new Error('No se puede reestablecer la contraseña con cuentas de Google.')

    const comparePassword = await bcrypt.compare(currentPassword, findUser.password)
    if(!comparePassword) throw new Error('Tu contraseña actual es incorrecta.')

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    await user.update({password: hashedPassword}, {where: {id: findUser.id, email: findUser.email}})

    return {
        error: null,
        message: 'La contraseña se actualizó correctamente.'
    }
}

module.exports = updatePasswordUser