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
			temperaments: el.temperaments.map((t) => t.name),
			colors: el.colors.map((c) => c.name),
			gender: genderStr,
		};
	});

	return data;
};

const getDogsByName = async (name) => {
	let name2 = name.toLowerCase();
	let all = await getAllDogs();
	let result = all.filter((inst) => inst.name.toLowerCase().includes(name2));

	if (result.length) {
		return result;
	} else {
		throw new Error(`El perro con nombre ${name} no existe`);
	}
};

const getDogById = async (id) => {
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

	if (dogui) {
		return dogui;
	} else {
		return { error: `El perro con id ${id} no existe` };
	}
};

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
		!image
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

		if(genders) {
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
		console.log(error);
		return 'Error al intentar actualizar el perro';
	}
};

const deleteDog = async (id) => {
	try {
		let doguiToDelete = await dog.findOne({
			where: {
				id: id,
			},
		});
		if (!doguiToDelete) {
			throw new Error(`No se encontró ningún perro con id ${id}`);
		} else {
			await doguiToDelete.destroy();
			return `El perro con id ${id} se eliminó correctamente`;
		}
	} catch (error) {
		return 'Error al intentar borrar el perro';
	}
};

module.exports = {
	getAllDogs,
	getDogsByName,
	getDogById,
	postNewDog,
	updateDog,
	deleteDog,
};
