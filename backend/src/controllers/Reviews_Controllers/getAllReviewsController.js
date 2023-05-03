const { reviews, user } = require('../../database/db');
const reviewsJson = require('../../Json/Reviews.json');

const getAllReviews = async () => {
	try {
		let info = await reviews.findAll({
			include: [
				{
					model: user,
				},
			],
		});

		if (!info.length) {
			let review = reviewsJson.reviews;

			for (let i = 0; i < review.length; i++) {
				let jsonReview = await reviews.create({
					rating: review[i].rating,
					comment: review[i].comment,
				});

				let userComent = await user.findOne({
					where: { id: review[i].userId },
				});

				await jsonReview.setUser(userComent);
			}
		}

		return info;
	} catch (error) {
		return error;
	}
};

module.exports = getAllReviews;
