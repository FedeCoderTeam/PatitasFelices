const { Router } = require('express')
const passport = require('passport')

const router = Router()

router.get('/',
    passport.authenticate('google', { session: false, scope: ['email', 'profile'] })
)

router.get('/callback',
    passport.authenticate('google', { session: false, scope: ['profile', 'email'] }),
    async (req, res, next) => {
        try {
            res.send(`<html><body onload="window.opener.postMessage('AUTH_SUCCESS', 'http://localhost:3000/home');window.close();"></body></html>`);
            // res.redirect('http://localhost:3000/home')
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router;