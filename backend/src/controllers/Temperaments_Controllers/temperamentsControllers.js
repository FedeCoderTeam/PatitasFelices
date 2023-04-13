const { temperament } = require('../../database/db');
const features = require('../../Json/Features.json');

const dogsTemperaments = async () => {
	try {
		let temperaments = await temperament.findAll({
			attributes: ['id', 'name'],
		});

		if (!temperaments.length) {
			let allTemperaments = features.temperaments;

			allTemperaments = allTemperaments.map((el, index) => {
				return { id: index + 1, name: el };
			});

			await temperament.bulkCreate(allTemperaments);
		}

		return temperaments;
	} catch (error) {
		return { error: 'No temperaments available on Data Base' };
	}
};

module.exports = dogsTemperaments;
