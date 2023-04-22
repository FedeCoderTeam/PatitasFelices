const { Router } = require ('express');
const cors = require('cors')
const getAllUsers = require ('../../controllers/User_Controllers/getAllUsersController');
const getUserById= require ('../../controllers/User_Controllers/getUserByIdController')
const postNewUser= require ('../../controllers/User_Controllers/postNewUserController')
const updateUser= require ('../../controllers/User_Controllers/updateUserController')
const loginUser= require ('../../controllers/User_Controllers/loginUserController')
const authUser= require ('../../controllers/User_Controllers/authUserController')
const logoutUser = require('../../controllers/User_Controllers/logoutUserController')
const registerUser = require('../../controllers/User_Controllers/registerUserController')
const userGoogle = require('../../controllers/User_Controllers/userGoogleController')
const recoveryPassword = require('../../controllers/User_Controllers/recoveryPasswordUserController')
const verifyUser = require('../../controllers/User_Controllers/verifyUserController')

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
router.post('/login', cors({credentials: true, origin: 'http://localhost:3000'}), async (req, res) => {
	let { email, password } = req.body
	try {
		const result = await loginUser(email, password);
		res.cookie('token', result.token, {maxAge: 86400000, httpOnly: true, sameSite: 'lax', secure: false}).status(200).json({error: null, ...result})
	} catch (error) {
		res.clearCookie('token', {httpOnly: true, sameSite: 'lax', secure: false})
		res.status(401).json({error: error.message, authenticated: false, token: null, user: null})
	}
})

//CREATE AUTH (TOKEN)
router.post('/auth', cors({credentials: true, origin: 'http://localhost:3000'}), async (req, res) => {
	const token = req.cookies.token
	try {
		let result = await authUser(token);
		res.status(200).json({error: null, ...result})
	} catch (error) {
		res.clearCookie('token', {httpOnly: true, sameSite: 'lax', secure: false})
		res.status(401).json({error: error.message, authenticated: false, token: null, user: null})
	}
})

router.post('/logout', cors({credentials: true, origin: 'http://localhost:3000'}), async(req, res) => {
	const token = req.cookies.token
	const {id} = req.body
	try {
		let result = await logoutUser(id, token)
		res.clearCookie('token', {httpOnly: true, sameSite: 'lax', secure: false})
		res.status(200).json({error: null, ...result})
	} catch (error) {
		console.log(error)
		res.status(401).json({error: error.message})
	}
})

router.post('/register', async(req, res) => {
	const { name, last, email, password } = req.body
	try {
		let result = await registerUser(name, last, email, password)
		res.status(200).json({...result})
	} catch (error) {
		console.log(error)
		res.status(400).json({error: error.message, message: null})
	}
})

router.post('/google', cors({credentials: true, origin: 'http://localhost:3000'}), async(req, res) => {
	const {tokenGoogle} = req.body
	try {
		const result = await userGoogle(tokenGoogle)
		res.cookie('token', result.token, {maxAge: 86400000, httpOnly: true, sameSite: 'lax', secure: false}).status(200).json({error: null, ...result})
	} catch (error) {
		console.log(error)
		res.clearCookie('token', {httpOnly: true, sameSite: 'lax', secure: false})
		res.status(401).json({error: error.message, authenticated: false, token: null, user: null})
	}
})

router.post('/recovery', async(req, res) => {
	const {email} = req.body
	try {
		const result = await recoveryPassword(email)
		res.status(200).json({...result})
	} catch (error) {
		console.log(error)
		res.status(400).json({error: error.message, message: null})
	}
})

router.post('/verify', async (req, res) => {
	const { token } = req.body
	try {
		const result = await verifyUser(token)
		res.status(200).json(result)
	} catch (error) {
		console.log(error)
		res.status(400).json({error: error.message, message: null})
	}
})
