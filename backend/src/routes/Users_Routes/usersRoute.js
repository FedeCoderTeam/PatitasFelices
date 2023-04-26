const { Router } = require ('express');

const getAllUsers = require ('../../controllers/User_Controllers/getAllUsersController');
const getUserById = require ('../../controllers/User_Controllers/getUserByIdController')
const postNewUser = require ('../../controllers/User_Controllers/postNewUserController')
const updateUser = require ('../../controllers/User_Controllers/updateUserController')

const router = Router();

//GET ALL USERS
router.get('/', async(req, res)=> {
    try {
         let result = await getAllUsers()
         res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
});

//GET USER BY ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		let result = await getUserById(id);
		if (result.error) throw new Error(result.error);
		res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

//CREATE USER (CLIENT)
router.post('/', async (req, res) => {
	let { name, last, email, password, image, roles } = req.body;
	try {
		await postNewUser(name, last, email, password, image, roles);
		res.status(200).send(`${name} se agregó correctamente`);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

//UPDATE USER
router.put('/', async(req, res)=> {
    let { id, password, image, isDisabled, roleId } = req.body;
    try {
        let userUpdated= await updateUser(id, password, image, isDisabled, roleId);
        if (userUpdated.error) {
			throw new Error(userUpdated.error);
		} else {
			res.status(200).json(userUpdated);
		}
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;
