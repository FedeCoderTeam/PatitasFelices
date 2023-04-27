const { reviews }= require ('../../database/db')
const { verifyToken } = require('../../utils/token');
// const jwt = require('jsonwebtoken')

const updateReview = async(token, id, comment, rating)=> {

    if(!token || !id || !comment || !rating) throw new Error ('Token, id, comment and rating are required')

    const decoded = verifyToken(token, process.env.JWT_PRIVATE_KEY_AUTH)

    let reviewToUpdate = await reviews.findOne({ where: { id: id, userId: decoded.user.id } });

    if(!reviewToUpdate) throw new Error(`No se encontró una revisión con el id ${id}`);

    await reviewToUpdate.update({
        rating: rating,
        comment:comment
    }, {where: {id: id, userId: decoded.user.id}});
    return {
        error: null,
        message: 'Se modificó correctamente la revisión'
    }
};

module.exports = { updateReview };