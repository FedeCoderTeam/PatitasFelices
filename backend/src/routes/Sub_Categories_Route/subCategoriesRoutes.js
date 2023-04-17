const { Router } = require('express');
const router = Router();
const getSubCategory = require('../../controllers/SubCategory_Controllers/subCategoryControllers');

router.get('/', async (req, res) => {
	try {
		let allSubCategories = await getSubCategory();

		if (allSubCategories.error) throw new Error(allSubCategories.error);
		res.status(200).json(allSubCategories);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
