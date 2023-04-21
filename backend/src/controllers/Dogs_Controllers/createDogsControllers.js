const { dog, color, gender, temperament } = require('../../database/db');
const dogsJson = require('../../Json/Dogs.json');

const createDogsControllers = async () => {
	try {
		let alldogs = [];

		let newDogs = dogsJson.dogs;

		for (let i = 0; i < newDogs.length; i++) {
			let dogDb = await dog.create({
				name: newDogs[i].name,
				age: newDogs[i].age,
				size: newDogs[i].size,
				weight: newDogs[i].weight,
				castrated: newDogs[i].castrated,
				image: newDogs[i].image,
				description: newDogs[i].description,
			});

			let colors = await color.findAll({ where: { name: newDogs[i].colors } });
			await dogDb.addColor(colors);

			let genders = await gender.findOne({
				where: { name: newDogs[i].genders },
			});
			await dogDb.setGender(genders);

			let tempers = await temperament.findAll({
				where: { name: newDogs[i].tempers },
			});
			await dogDb.addTemperament(tempers);

			alldogs.push(dogDb);
		}

		return alldogs;
	} catch (error) {
		return 'Error in create dog';
	}
};

module.exports = createDogsControllers;
