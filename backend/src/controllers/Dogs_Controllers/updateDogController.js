const { dog, color, gender, temperament } = require('../../database/db');

const updateDog = async (
	id,
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
	adopted,
	isDisabled,
) => {
	try {
		let doguiToUpdate = await dog.findOne({
			where: {
				id: id,
			},
		});

		if (!doguiToUpdate) {
			throw new Error(`No se encontró un perro con id ${id}`);
		}
		await doguiToUpdate.update({
			name: name,
			age: age,
			size: size,
			weight: weight,
			castrated: castrated,
			image: image,
			description: description,
			adopted: adopted,
			isDisabled: isDisabled,
		});

		if (tempers) {
			await doguiToUpdate.setTemperaments([]);
			let newTempers = await temperament.findAll({
				where: {
					name: tempers,
				},
			});
			await doguiToUpdate.addTemperaments(newTempers);
		}

		if (colors) {
			await doguiToUpdate.setColors([]);
			let newColors = await color.findAll({
				where: {
					name: colors,
				},
			});
			await doguiToUpdate.addColors(newColors);
		}

		if (genders) {
			let newGender = await gender.findOne({
				where: {
					name: genders,
				},
			});
			if (newGender) {
				await doguiToUpdate.setGender(newGender);
			}
		}

		return 'Se modificó correctamente al perro';
	} catch (error) {
		return 'Error al intentar actualizar el perro';
	}
};

module.exports = updateDog;
