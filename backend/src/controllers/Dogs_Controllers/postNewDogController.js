const { dog, color, gender, temperament } = require('../../database/db');

const postNewDog = async (
	name,
	age,
	size,
	weight,
	castrated,
	tempers,
	colors,
	genders,
	image,
	description,
) => {
	if (
		!name ||
		!age ||
		!size ||
		!weight ||
		!castrated ||
		!tempers ||
		!colors ||
		!genders ||
		!image ||
		!description
	) {
		throw new Error(
			'Falta completar algún o algunos datos (name, age, size, weight, castrated, temperament, color, gender)',
		);
	} else {
		let newDog = await dog.create({
			name: name,
			age: age,
			size: size,
			weight: weight,
			castrated: castrated,
			image: image,
			description: description,
		});
		let temper = await temperament.findAll({
			where: {
				name: tempers,
			},
		});
		await newDog.addTemperament(temper);

		let colour = await color.findAll({
			where: {
				name: colors,
			},
		});
		await newDog.addColor(colour);

		let genre = await gender.findOne({
			where: {
				name: genders,
			},
		});
		await newDog.setGender(genre);
	}
};

module.exports = postNewDog;