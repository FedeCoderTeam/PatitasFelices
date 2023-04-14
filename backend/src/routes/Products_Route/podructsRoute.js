const { Router } = require('express');
const router = Router();
const getAllProducts = require('../../controllers/Product_Controllers/productControllers');
const getProductById = require('../../controllers/Product_Controllers/productIdControllers');

router.get('/', async (req, res) => {
	try {
		let allProducts = await getAllProducts();

		if (allProducts.error) throw new Error(allProducts.error);

		res.status(200).json(allProducts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	let { id } = req.params;

	try {
		let productId = await getProductById(id);

		if (productId.error) throw new Error(productId.error);

		res.status(200).json(productId);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
