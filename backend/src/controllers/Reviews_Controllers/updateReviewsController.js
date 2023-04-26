const { reviews }= require ('../../database/db')
// const jwt = require('jsonwebtoken')

const updateReview= async(id, rating, comment)=> {
    console.log(id, rating, comment);
    try {
        // const infoUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY_AUTH)

        // if(infoUser.user.role.name !== 'Usuario') return 'Error al intentar actualizar la revisión'

        let reviewToUpdate = await reviews.findOne({ where: { id: id } });

        console.log(reviewToUpdate)

        if(!reviewToUpdate) throw new Error(`No se encontró una revisión con id ${id}`);

        await reviewToUpdate.update({
			rating: rating,
            comment:comment
		});
        return 'Se modificó correctamente la revisión'
    } catch (error) {
        return 'Error al intentar actualizar la revisión';
    }
};

module.exports= {updateReview};