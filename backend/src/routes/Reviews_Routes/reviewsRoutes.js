const { Router } = require('express');
const getAllReviews = require('../../controllers/Reviews_Controllers/getAllReviewsController');
const {
	postNewReview,
} = require('../../controllers/Reviews_Controllers/postNewReviewController');
const {
	updateReview,
} = require('../../controllers/Reviews_Controllers/updateReviewsController');
const deleteReview = require('../../controllers/Reviews_Controllers/deleteReviewControllers');

const router = Router();

router.get('/', async (req, res) => {
	try {
		let info = await getAllReviews();
		res.status(200).json(info);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	let { token, comment, rating } = req.body;
	try {
		let result = await postNewReview(token, comment, rating);
		res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ error: error.message, message: null });
	}
});

router.put('/', async (req, res) => {
	let { token, id, comment, rating } = req.body;
	try {
		let result = await updateReview(token, id, comment, rating);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
});

router.delete('/:id', async (req, res) => {
	let {id} = req.params;
	try {
		let reviewDelete = await deleteReview(id);
		if (reviewDelete.error) throw new Error(reviewDelete.error);
		res.status(200).json(reviewDelete);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
});

module.exports = router;
