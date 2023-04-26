const { reviews, user } = require ('../../database/db')

const postNewReview= async( rating, comment, userId )=>{
    if(!rating || !comment || !userId){
        throw new Error ('Falta completar alguno de los datos obligatorios')
    }

    let usuarId= await user.findOne({
        where: {
            id: userId
        },
    });

    let newReview= await reviews.create({
        rating: rating,
        comment: comment,
    });

    await newReview.setUser(usuarId);
}

module.exports= {postNewReview};