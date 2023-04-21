const { product, category, subCategory } = require('../../database/db');
const productsJson = require('../../Json/Productos.json');

const createPoducts = async () => {
	try {
		let allProducts = [];

		let createAllProducts = productsJson.products;

		for (let i = 0; i < createAllProducts.length; i++) {
			let productDb = await product.create({
				name: createAllProducts[i].name,
				description: createAllProducts[i].description,
				price: createAllProducts[i].price,
				stock: createAllProducts[i].stock,
				brand: createAllProducts[i].brand,
				image: createAllProducts[i].image,
			});

			let categories = await category.findOne({
				where: { name: createAllProducts[i].category },
			});
			await productDb.setCategory(categories);

			let subCategories = await subCategory.findOne({
				where: { name: createAllProducts[i].subCategory },
			});
			await productDb.setSubCategory(subCategories);

			allProducts.push(productDb);
		}

		return allProducts;
	} catch (error) {
		return { error: 'Error when creating products' };
	}
};

module.exports = createPoducts;
