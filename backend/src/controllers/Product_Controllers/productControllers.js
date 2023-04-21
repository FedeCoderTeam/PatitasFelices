const { product, category, subCategory } = require('../../database/db');
const createPoducts = require('./createProducts');

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
			allProducts = await createPoducts();
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
