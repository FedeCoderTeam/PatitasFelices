const { category, subCategory } = require('../../database/db');
const categoryJson = require('../../Json/Categories.json');

const getSubCategory = async () => {
	try {
		let subCategories = await subCategory.findAll({
			attributes: ['id', 'name', 'categoryId'],
		});

		if (!subCategories.length) {
			let allSubCategories = categoryJson.subCategory;

			for (let i = 0; i < allSubCategories.length; i++) {
				let subCategoriesDb = await subCategory.create({
					name: allSubCategories[i],
				});

				let categoryId =
					allSubCategories[i] === 'Adulto' || allSubCategories[i] === 'Cachorro'
						? 1
						: 2;

				let categories = await category.findOne({
					where: { id: categoryId },
				});

				await subCategoriesDb.setCategory(categories);
			}
		}

		return subCategories;
	} catch (error) {
		return { error: 'No categories available on Data Base' };
	}
};

module.exports = getSubCategory;
