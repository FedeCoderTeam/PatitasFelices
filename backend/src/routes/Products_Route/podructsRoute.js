const { Router } = require('express');
const router = Router();
const getAllProducts = require('../../controllers/Product_Controllers/productControllers');
const getProductById = require('../../controllers/Product_Controllers/productIdControllers');
const productByName = require('../../controllers/Product_Controllers/prodcutNameControllers');
const productPostControllers = require('../../controllers/Product_Controllers/productPostControllers');
const productUpdateControllers = require('../../controllers/Product_Controllers/poductUpdateControllers');

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

router.post('/', async (req, res) => {
	let { name, description, price, stock, brand, image, category, subCategory } =
		req.body;

	try {
		let newProuct = await productPostControllers(
			name,
			description,
			price,
			stock,
			brand,
			image,
			category,
			subCategory,
		);

		if (newProuct.error) throw new Error(newProuct.error);

		res.status(200).json(newProuct);
	} catch (error) {
		res.status(400).json({ error: error.messages });
	}
});

router.put('/', async (req, res) => {
	let {
		id,
		name,
		description,
		price,
		image,
		brand,
		stock,
		isDisabled,
		categoryId,
		subCategoryId,
	} = req.body;

	try {
		let updateProduct = await productUpdateControllers(
			id,
			name,
			description,
			price,
			image,
			brand,
			stock,
			isDisabled,
			categoryId,
			subCategoryId,
		);

		if (updateProduct.error) throw new Error(updateProduct.error);

		res.status(200).json(updateProduct);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
