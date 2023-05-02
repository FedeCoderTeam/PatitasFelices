const { reviews } = require('../../database/db');

let deleteReview = async (reviewId) => {
	try {
		let reviewDelete = await reviews.findOne({ where: { id: reviewId } });

		if (!reviewDelete) {
			throw new Error('Review not found');
		}

		await reviewDelete.destroy();
		return 'Reviews successfully removed';
	} catch (error) {
		return 'Error deleting review';
	}
};

module.exports = deleteReview;
