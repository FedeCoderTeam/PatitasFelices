const { gender } = require('../../database/db');
const genderJson = require('../../Json/Gender.json');

const dogsGenders = async () => {
	try {
		let genders = await gender.findAll({
			attributes: ['id', 'name'],
		});

		if (!genders.length) {
			let allGenders = genderJson.gender;

			allGenders = allGenders.map((el, index) => {
				return { id: index + 1, name: el };
			});

			await gender.bulkCreate(allGenders);
		}

		return genders;
	} catch (error) {
		return { error: 'No genders available on Data Base' };
	}
};

module.exports = dogsGenders;
