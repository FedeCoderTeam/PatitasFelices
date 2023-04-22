const { dog, color, gender, temperament } = require('../../database/db');

const getDogById = async (id) => {
	try {
		let dogui = await dog.findOne({
			where: {
				id: id,
			},
			include: [
				{
					model: temperament,
					attributes: ['name'],
					through: { attributes: [] },
				},
				{ model: color, attributes: ['name'], through: { attributes: [] } },
				{ model: gender, attributes: ['name'] },
			],
		});

		let genderStr = dogui.genderId === 1 ? 'Hembra' : 'Macho';

		dogui = {
			id: dogui.id,
			name: dogui.name,
			age: dogui.age,
			size: dogui.size,
			weight: dogui.weight,
			castrated: dogui.castrated,
			image: dogui.image,
			description: dogui.description,
			temperaments: dogui.temperaments.map((t) => t.name),
			colors: dogui.colors.map((c) => c.name),
			gender: genderStr,
		};

		return dogui;
	} catch (error) {
		return { error: `El perro con id ${id} no existe` };
	}
};

module.exports = getDogById;