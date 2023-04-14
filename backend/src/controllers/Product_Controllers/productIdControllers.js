const { product, category, subCategory } = require('../../database/db');

const getProductById = async (id) => {
	try {
		let productId = await product.findOne({
			where: {
				id: id,
			},
			include: [
				{
					model: category,
				},
				{
					model: subCategory,
				},
			],
		});

		productId = {
			id: productId.id,
			name: productId.name,
			description: productId.description,
			price: productId.price,
			stock: productId.stock,
			brand: productId.brand,
			image: productId.image,
			category: productId.category.name,
			subCategory: productId.subCategory.name,
		};

		return productId;
	} catch (error) {
		console.log(error.message);
		return { error: `Product with id ${id} does not exist` };
	}
};

module.exports = getProductById;
