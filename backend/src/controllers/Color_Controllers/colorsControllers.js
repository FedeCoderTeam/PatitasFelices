const { color } = require('../../database/db');
const features = require('../../Json/Features.json');

const dogsColors = async () => {
	try {
		let colors = await color.findAll({
			attributes: ['id', 'name'],
		});

		if (!colors.length) {
			let allColors = features.colors;

			allColors = allColors.map((el, index) => {
				return { id: index + 1, name: el };
			});

			await color.bulkCreate(allColors);
		}

		return colors;
	} catch (error) {
		return { error: 'No colors available on Data Base' };
	}
};

module.exports = dogsColors;
