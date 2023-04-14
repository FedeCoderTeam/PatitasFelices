const { category } = require('../../database/db');
const categoryJson = require('../../Json/Categories.json');

const getCategory = async () => {
	try {
		let categories = await category.findAll({
			attributes: ['id', 'name'],
		});

		if (!categories.length) {
			let allCategories = categoryJson.category;

			allCategories = allCategories.map((el, index) => {
				return { id: index + 1, name: el };
			});

			await category.bulkCreate(allCategories);
		}

		return categories;
	} catch (error) {
		return { error: 'No categories available on Data Base' };
	}
};

module.exports = getCategory;
