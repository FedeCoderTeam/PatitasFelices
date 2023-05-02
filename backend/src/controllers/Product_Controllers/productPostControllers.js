const { product, category, subCategory } = require('../../database/db');

const productPostControlers = async (
	name,
	description,
	price,
	stock,
	brand,
	image,
	refCategory,
	refSubCategory,
) => {
	try {
		if (
			!name ||
			!description ||
			!price ||
			!stock ||
			!brand ||
			!image ||
			!refCategory ||
			!refSubCategory
		)
			throw new Error('Important data missing');

		let newProduct = await product.create({
			name: name,
			description: description,
			price: price,
			stock: stock,
			brand: brand,
			image: image,
			category: refCategory,
			subCategory: refSubCategory,
		});

		let addCategories = await category.findOne({
			where: {
				name: refCategory,
			},
		});

		await newProduct.setCategory(addCategories);

		let addSubCategories = await subCategory.findOne({
			where: {
				name: refSubCategory,
			},
		});

		await newProduct.setSubCategory(addSubCategories);

		return 'Successfully created product';
	} catch (error) {
		console.log(error);
		return 'Error in create product';
	}
};

module.exports = productPostControlers;
