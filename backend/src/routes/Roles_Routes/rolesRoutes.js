const { Router } = require('express');
const router = Router();
const userRoles = require('../../controllers/Roles_Controllers/rolesControlers');

router.get('/', async (req, res) => {
	try {
		let allRoles = await userRoles();

		if (allRoles.error) throw new Error(allRoles.error);
		res.status(200).json(allRoles);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
