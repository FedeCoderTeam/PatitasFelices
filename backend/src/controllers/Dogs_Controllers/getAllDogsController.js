const { dog, color, gender, temperament } = require('../../database/db');
const dogsJson = require('../../Json/Dogs.json');

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
		let alldogs = dogsJson.dogs;

		for (let i = 0; i < alldogs.length; i++) {
			let dogDb = await dog.create({
				name: alldogs[i].name,
				age: alldogs[i].age,
				size: alldogs[i].size,
				weight: alldogs[i].weight,
				castrated: alldogs[i].castrated,
				image: alldogs[i].image,
				description: alldogs[i].description,
			});

			let colors = await color.findAll({ where: { name: alldogs[i].colors } });
			await dogDb.addColor(colors);

			let genders = await gender.findOne({
				where: { name: alldogs[i].genders },
			});
			await dogDb.setGender(genders);

			let tempers = await temperament.findAll({
				where: { name: alldogs[i].tempers },
			});
			await dogDb.addTemperament(tempers);
		}
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
		};
	});

	return data;
};

module.exports = getAllDogs;

