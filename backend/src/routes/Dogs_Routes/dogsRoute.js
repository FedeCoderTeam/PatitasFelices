const { Router } = require('express');
const getAllDogs = require('../../controllers/Dogs_Controllers/getAllDogsController');
const getDogsByName = require('../../controllers/Dogs_Controllers/getDogsByNameController');
const getDogById = require('../../controllers/Dogs_Controllers/getDogByIdController');
const postNewDog = require('../../controllers/Dogs_Controllers/postNewDogController');
const updateDog = require('../../controllers/Dogs_Controllers/updateDogController');
const deleteDog = require('../../controllers/Dogs_Controllers/deleteDogController');
const router = Router();

router.get('/', async (req, res) => {
	const { name } = req.query;
	try {
		if (!name) {
			let result = await getAllDogs();
			return res.status(200).json(result);
		} else {
			let result = await getDogsByName(name);
			return res.status(200).json(result);
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		let result = await getDogById(id);
		if (result.error) throw new Error(result.error);
		res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	let {
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
	} = req.body;
	try {
		await postNewDog(
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
		);
		res.status(200).send(`${name} se agregó correctamente`);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.put('/', async (req, res) => {
	let {
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
	} = req.body;

	try {
		let updateDogui = await updateDog(
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
		);
		if (updateDogui.error) {
			throw new Error(updateDogui.error);
		} else {
			res.status(200).json(updateDogui);
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.delete('/delete/:id', async (req, res) => {
	let { id } = req.params;
	try {
		let dogToDelete = await deleteDog(id);
		if (dogToDelete.error) {
			throw new Error(dogToDelete.error);
		} else {
			res.status(200).json(dogToDelete);
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;
