const { dog, color, gender, temperament } = require('../../database/db');
const createDogsControllers = require('./createDogsControllers');

const getAllDogs = async () => {
	let data = await dog.findAll({
		include: [
			{
				model: temperament,
				attributes: ['name'],
				through: { attributes: [] },
			},
			{
				model: color,
				attributes: ['name'],
				through: { attributes: [] },
			},
			{ model: gender },
		],
	});

	if (!data.length) {
		await createDogsControllers();
	}

	data = data.map((el) => {
		let genderStr = '';
		if (el.genderId === 1) {
			genderStr = 'Hembra';
		} else if (el.genderId === 2) {
			genderStr = 'Macho';
		}

		return {
			id: el.id,
			name: el.name,
			age: el.age,
			size: el.size,
			weight: el.weight,
			castrated: el.castrated,
			image: el.image,
			description: el.description,
			temperaments: el.temperaments.map((t) => t.name),
			colors: el.colors.map((c) => c.name),
			gender: genderStr,
			adopted: el.adopted,
			isDisabled: el.isDisabled,
		};
	});

	return data;
};

module.exports = getAllDogs;
