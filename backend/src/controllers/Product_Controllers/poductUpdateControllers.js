const { product, category, subCategory } = require('../../database/db');

const productUpdateControllers = async (
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
	quantity,
) => {
	try {
		let productToUpdate = await product.findOne({
			where: {
				id: id,
			},
		});

		if (!productToUpdate) throw new Error(`No product found with id ${id}`);

		let newSotck = stock - quantity;

		await productToUpdate.update({
			name: name,
			description: description,
			price: price,
			image: image,
			brand: brand,
			stock: newSotck,
			isDisabled: isDisabled,
			categoryId: categoryId,
			subCategoryId: subCategoryId,
		});

		if (categoryId) {
			await productToUpdate.setCategory(null);

			let newCategoryId = await category.findOne({
				where: {
					id: categoryId,
				},
			});

			await productToUpdate.setCategory(newCategoryId);
		}

		if (subCategoryId) {
			await productToUpdate.setSubCategory(null);

			let newSubCategory = await subCategory.findOne({
				where: {
					id: subCategoryId,
				},
			});

			await productToUpdate.setSubCategory(newSubCategory);
		}

		return 'Product was successfully modified';
	} catch (error) {
		console.log(error);
		return 'Error while trying to update the product';
	}
};

module.exports = productUpdateControllers;
