const { Router } = require('express');
const router = Router();
const dogsGenders = require('../../controllers/Gender_Controllers/genderControllers');

router.get('/', async (req, res) => {
	try {
		let allGenders = await dogsGenders();

		if (allGenders.error) throw new Error(allGenders.error);
		res.status(200).json(allGenders);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
