const { Router } = require ('express');
const {getAllUsers, getUserById, postNewUser, updateUser, loginUser, authUser} = require ('../../controllers/User_Controllers/userControllers');

const router= Router();

//GET ALL USERS
router.get('/', async(req, res)=> {
    try {
         let result= await getAllUsers();
         res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
});

//GET USER BY ID
router.get('/:id', async(req, res)=> {
    const {id}= req.params
    try {
		let result = await getUserById(id);
		if (result.error) throw new Error(result.error);
		res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
})

//CREATE USER (CLIENT)
router.post('/', async (req, res) => {
	let { name, last, email, password, image, roles } =
		req.body;
	try {
		await postNewUser(name, last, email, password, image, roles);
		res.status(200).send(`${name} se agregó correctamente`);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});


//UPDATE USER (CLIENT)
router.put('/update/:id', async(req, res)=> {
    let { googleId, name, last, email, password, image, roles, isVerified, isDisabled } = req.body;
	let {id}= req.params
    try {
        let userUpdated= await updateUser(id, googleId, name, last, email, password, image, roles, isVerified, isDisabled);
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

//💥
//CREATE LOGIN (MAIL, PASSWORD)
router.post('/login', async (req, res) => {
	let { email, password } = req.body
	try {
		const result = await loginUser(email, password);
		res.status(200).send(result)
	} catch (error) {
		res.status(401).json({error: error.message})
	}
})

//CREATE AUTH (TOKEN)
router.post('/auth', async (req, res) => {
	let { token } = req.body
	try {
		await authUser(token);
		res.status(200).json({authentication: true})
	} catch (error) {
		res.status(401).json({authentication: false})
	}
})
//CREATE LOGOUT 
