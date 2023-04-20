const { Router } = require('express');
const router = Router();
const getAllProducts = require('../../controllers/Product_Controllers/productControllers');
const getProductById = require('../../controllers/Product_Controllers/productIdControllers');
const productByName = require('../../controllers/Product_Controllers/prodcutNameControllers');

router.get('/', async (req, res) => {
	let { name } = req.query;
	try {
		if (!name) {
			let allProducts = await getAllProducts();

			if (allProducts.error) throw new Error(allProducts.error);

			res.status(200).json(allProducts);
		} else {
			let productName = await productByName(name);

			if (productName.error) throw new Error(productName.error);

			res.status(200).json(productName);
		}
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

// router.post('/', async (req, res) => {
// 	let { newProduct } = req.body;

// 	try {

// 	} catch (error) {

// 	}
// });

module.exports = router;
