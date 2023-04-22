const { Router } = require('express')
const cors = require('cors')

const authUser = require('../../controllers/Auth_Controllers/authUserController')
const registerUser = require('../../controllers/Auth_Controllers/registerUserController')
const loginUser = require('../../controllers/Auth_Controllers/loginUserController')
const logoutUser = require('../../controllers/Auth_Controllers/logoutUserController')

const verifyUser = require('../../controllers/Auth_Controllers/verifyUserController')
const requestPasswordResetUser = require('../../controllers/Auth_Controllers/requestPasswordResetUserController')
const verifyPasswordResetUser = require('../../controllers/Auth_Controllers/verifyPasswordResetUserController')
const confirmPasswordResetUser = require('../../controllers/Auth_Controllers/confirmPasswordResetUserController')
const updatePasswordUser = require('../../controllers/Auth_Controllers/updatePasswordUserController')

// const userGoogle = require('../../controllers/Auth_Controllers/userGoogleController');

const router = Router()

router.post('/', cors({credentials: true, origin: 'http://localhost:3000'}), async (req, res) => {
    const { tkn_usr } = req.cookies
    try {
        let result = await authUser(tkn_usr);
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.clearCookie('tkn_usr', {httpOnly: false, sameSite: 'none', secure: false})
        res.status(401).json({error: error.message, authenticated: false, token: null, user: null})
    }
})

router.post('/register', async(req, res) => {
    const { name, last, email, password } = req.body
    try {
        let result = await registerUser(name, last, email, password)
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message, message: null})
    }
})

router.post('/login', cors({credentials: true, origin: 'http://localhost:3000'}), async (req, res) => {
    let { email, password } = req.body
    try {
        const result = await loginUser(email, password);
        res.cookie('tkn_usr', result.token, {maxAge: 86400000, httpOnly: false, sameSite: 'none', secure: false})
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.clearCookie('tkn_usr', {httpOnly: false, sameSite: 'none', secure: false})
        res.status(401).json({error: error.message, authenticated: false, token: null, user: null})
    }
})

router.post('/logout', cors({credentials: true, origin: 'http://localhost:3000'}), async(req, res) => {
    const { id } = req.body
    const { tkn_usr } = req.cookies
    try {
        let result = await logoutUser(id, tkn_usr)
        res.clearCookie('tkn_usr', {httpOnly: false, sameSite: 'none', secure: false})
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(401).json({error: error.message})
    }
})

router.post('/verify-account', async (req, res) => {
    const { token } = req.body
    try {
        const result = await verifyUser(token)
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message, message: null})
    }
})

router.post('/request-password-reset', async (req, res) => {
    const { email } = req.body
    try {
        const result = await requestPasswordResetUser(email)
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message, message: null})
    }
})

router.post('/verify-password-reset', async (req, res) => {
    const { token } = req.body
    try {
        const result = await verifyPasswordResetUser(token)
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message, message: null})
    }
})

router.post('/password-reset', async(req, res) => {
    const { token, password } = req.body
    try {
        const result = await confirmPasswordResetUser(token, password)
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message, message: null})
    }
})

router.post('/change-password', async(req, res) => {
    const { token, currentPassword, newPassword } = req.body
    try {
        const result = await updatePasswordUser(token, currentPassword, newPassword)
        res.status(200).json(result)
    } catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message, message: null})
    }
})

// router.post('/google', cors({credentials: true, origin: 'http://localhost:3000'}), async(req, res) => {
//     const {tokenGoogle} = req.body
//     try {
//         const result = await userGoogle(tokenGoogle)
//         res.cookie('token', result.token, {maxAge: 86400000, httpOnly: true, sameSite: 'lax', secure: false}).status(200).json({error: null, ...result})
//     } catch (error) {
//         console.log(error)
//         res.clearCookie('token', {httpOnly: true, sameSite: 'lax', secure: false})
//         res.status(401).json({error: error.message, authenticated: false, token: null, user: null})
//     }
// })

module.exports = router