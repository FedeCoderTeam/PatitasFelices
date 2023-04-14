const { Router } = require('express');
const router = Router();
const getAllProducts = require('../../controllers/Product_Controllers/productControllers');

router.get('/', async (req, res) => {
	try {
		let allProducts = await getAllProducts();

		if (allProducts.error) throw new Error(allProducts.error);

		res.status(200).json(allProducts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
