const { product, category, subCategory } = require('../../database/db');
const productsJson = require('../../Json/Productos.json');

const getAllProducts = async () => {
	try {
		let allProducts = await product.findAll({
			include: [
				{
					model: category,
				},
				{
					model: subCategory,
				},
			],
		});

		if (!allProducts.length) {
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
			}
		}

		allProducts = allProducts.map((el) => {
			return {
				id: el.id,
				name: el.name,
				description: el.description,
				price: el.price,
				stock: el.stock,
				brand: el.brand,
				image: el.image,
				category: el.category.name,
				subCategory: el.subCategory.name,
			};
		});

		return allProducts;
	} catch (error) {
		return { error: 'No products available on Data Base' };
	}
};

module.exports = getAllProducts;
