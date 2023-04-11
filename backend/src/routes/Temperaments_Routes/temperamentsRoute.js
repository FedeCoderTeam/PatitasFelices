const { Router } = require('express');
const router = Router();
const dogsTemperaments = require('../../controllers/Temperaments_Controllers/temperamentsControllers');

//get temperaments from db

router.get('/', async (req, res) => {
	try {
		let allTemperaments = await dogsTemperaments();

		if (allTemperaments.error) throw new Error(allTemperaments.error);
		res.status(200).json(allTemperaments);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
