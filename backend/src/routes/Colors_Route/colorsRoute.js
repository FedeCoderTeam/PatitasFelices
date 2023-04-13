const { Router } = require('express');
const router = Router();
const dogsColors = require('../../controllers/Color_Controllers/colorsControllers');

router.get('/', async (req, res) => {
	try {
		let allColors = await dogsColors();

		if (allColors.error) throw new Error(allColors.error);
		res.status(200).json(allColors);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
