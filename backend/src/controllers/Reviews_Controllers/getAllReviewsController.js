const { reviews, user } = require ('../../database/db')

const getAllReviews= async()=> {
    let info= await reviews.findAll({
        include: [
            {
				model: user,
			},
		]},
    );

    console.log(info)

    if (!info.length) {
        return "No hay revisiones aún"
    }
    return info;
}

module.exports= {getAllReviews};