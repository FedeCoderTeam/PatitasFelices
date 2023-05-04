const { Router } = require('express');
const getAllRequests = require('../../controllers/Request_Controllers/getAllRequestsController');
const postNewRequest = require('../../controllers/Request_Controllers/postNewRequestController');
const updateRequest = require('../../controllers/Request_Controllers/updateRequestController');
const router = Router();

router.get('/', async (req, res) => {
	try {
		let result = await getAllRequests();
		return res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	let {
		name,
		age,
		phone,
		address,
		email,
		areas_conditions,
		more_animals,
		moreAnimals_details,
		proper_income,
		inHouse_allowance,
		outDoor_image,
		dogId,
	} = req.body;
	try {
		await postNewRequest(
			name,
			age,
			phone,
			address,
			email,
			areas_conditions,
			more_animals,
			moreAnimals_details,
			proper_income,
			inHouse_allowance,
			outDoor_image,
			dogId,
		);
		res.status(200).send(`Se creo correctamente la solicitud`);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.put('/', async (req, res) => {
	let { id, status, dogId, token } = req.body;

	try {
		let updateAdopReq = await updateRequest(id, status, dogId, token);

		// if (updateAdopReq.error) throw new Error(updateAdopReq.error);

		res.status(200).json(updateAdopReq);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
