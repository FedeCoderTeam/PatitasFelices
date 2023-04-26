const { Router } = require('express');
const { getAllReviews }= require('../../controllers/Reviews_Controllers/getAllReviewsController')
const { postNewReview }= require ('../../controllers/Reviews_Controllers/postNewReviewController');
const { updateReview }= require ('../../controllers/Reviews_Controllers/updateReviewsController')

const router = Router();

router.get('/', async (req, res) => {
	try {
		let info= await getAllReviews();
        res.status(200).json(info)
	} catch (error) {
		res.status(400).json({error: error.mesage})
	}
});

router.post('/', async (req, res) => {
	let { rating, comment, userId } = req.body
	try {
		let result= await postNewReview(rating, comment, userId);
        res.status(200).send('La revisión se generó correctamente')
	} catch (error) {
        res.status(404).json({ error: error.message });
	}
});

router.put('/', async (req, res) => {
	let { id, rating, comment } = req.body;
	try {
		let result = await updateReview(id, rating, comment);

		if (updateReview.error) throw new Error(updateReview.error);

		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
