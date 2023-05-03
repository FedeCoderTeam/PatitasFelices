const { reviews, user } = require ('../../database/db')
const { verifyToken } = require('../../utils/token');

const postNewReview = async (token, comment, rating)=>{
    
    if(!token || !comment || !rating) throw new Error ('Token, comment and rating are required')

    const decoded = await verifyToken(token, process.env.JWT_PRIVATE_KEY_AUTH)

    const findUser = await user.findOne({
        where: {
            id: decoded.user.id
        },
    });

    let newReview= await reviews.create({
        rating: rating,
        comment: comment,
    });

    await newReview.setUser(findUser);

    return {
        error: null,
        message: 'La revisión se generó correctamente'
    }
}

module.exports = { postNewReview };