const { Router } = require('express');
const cors = require('cors');
const passport = require('passport');

const authUser = require('../../controllers/Auth_Controllers/authUserController');
const registerUser = require('../../controllers/Auth_Controllers/registerUserController');
const loginUser = require('../../controllers/Auth_Controllers/loginUserController');
const logoutUser = require('../../controllers/Auth_Controllers/logoutUserController');
const googleUser = require('../../controllers/Auth_Controllers/googleUserController');

const verifyUser = require('../../controllers/Auth_Controllers/verifyUserController');
const requestPasswordResetUser = require('../../controllers/Auth_Controllers/requestPasswordResetUserController');
const verifyPasswordResetUser = require('../../controllers/Auth_Controllers/verifyPasswordResetUserController');
const confirmPasswordResetUser = require('../../controllers/Auth_Controllers/confirmPasswordResetUserController');
const updatePasswordUser = require('../../controllers/Auth_Controllers/updatePasswordUserController');
const updateUserByOwn = require('../../controllers/Auth_Controllers/updateUserByOwnController');

// const userGoogle = require('../../controllers/Auth_Controllers/userGoogleController');

const router = Router();

router.post(
	'/',
	cors({ credentials: true, origin: 'http://localhost:3000' }),
	async (req, res) => {
		const { tkn_usr } = req.cookies;
		try {
			let result = await authUser(tkn_usr);
			res.status(200).json(result);
		} catch (error) {
			if (tkn_usr) {
				res.clearCookie('tkn_usr', {
					hostOnly: true,
					httpOnly: true,
					sameSite: 'lax',
					secure: true,
				});
			}
			res.status(401).json({
				error: error.message,
				authenticated: false,
				token: null,
				user: null,
			});
		}
	},
);

router.post('/register', async (req, res) => {
	const { name, last, email, password } = req.body;
	try {
		let result = await registerUser(name, last, email, password);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
});

router.post(
	'/login',
	cors({ credentials: true, origin: 'http://localhost:3000' }),
	async (req, res) => {
		let { email, password } = req.body;
		try {
			const result = await loginUser(email, password);
			res.cookie('tkn_usr', result.token, {
				maxAge: 86400000,
				hostOnly: false,
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
			});
			res.status(200).json(result);
		} catch (error) {
			res.clearCookie('tkn_usr', {
				hostOnly: false,
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
			});
			res.status(401).json({
				error: error.message,
				authenticated: false,
				token: null,
				user: null,
			});
		}
	},
);

router.post(
	'/logout',
	cors({ credentials: true, origin: 'http://localhost:3000' }),
	async (req, res) => {
		const { id } = req.body;
		const { tkn_usr } = req.cookies;
		try {
			let result = await logoutUser(id, tkn_usr);
			res.clearCookie('tkn_usr', {
				hostOnly: false,
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
			});
			res.status(200).json(result);
		} catch (error) {
			res.status(401).json({ error: error.message });
		}
	},
);

router.post(
	'/verify-account',
	cors({ credentials: true, origin: 'http://localhost:3000' }),
	async (req, res) => {
		const { token } = req.body;
		try {
			const result = await verifyUser(token);
			res.cookie('tkn_usr', result.token, {
				maxAge: 86400000,
				hostOnly: false,
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
			});
			res.status(200).json(result);
		} catch (error) {
			res.status(400).json({ error: error.message, message: null });
		}
	},
);

router.post('/request-password-reset', async (req, res) => {
	const { email } = req.body;
	try {
		const result = await requestPasswordResetUser(email);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
});

router.post('/verify-password-reset', async (req, res) => {
	const { token } = req.body;
	try {
		const result = await verifyPasswordResetUser(token);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: 'Unauthorized' });
	}
});

router.post('/password-reset', async (req, res) => {
	const { token, password } = req.body;
	try {
		const result = await confirmPasswordResetUser(token, password);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
});

router.post('/change-password', async (req, res) => {
	const { token, currentPassword, newPassword } = req.body;
	try {
		const result = await updatePasswordUser(
			token,
			currentPassword,
			newPassword,
		);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
});

router.post(
	'/update-user',
	cors({ credentials: true, origin: 'http://localhost:3000' }),
	async (req, res) => {
		const { token, name, last, image } = req.body;
		try {
			const result = await updateUserByOwn(token, name, last, image);
			res.cookie('tkn_usr', result.token, {
				maxAge: 86400000,
				hostOnly: false,
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
			});
			res.status(200).json(result);
		} catch (error) {
			res.status(400).json({ error: error.message, message: null });
		}
	},
);

router.get(
	'/google',
	passport.authenticate('google', {
		session: false,
		scope: ['email', 'profile'],
	}),
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		session: false,
		scope: ['email', 'profile'],
	}),
	async (req, res, next) => {
		try {
			const result = await googleUser(req.user);
			res.cookie('tkn_usr', result.token, {
				maxAge: 86400000,
				hostOnly: false,
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
			});
			res.send(`
                <html>
                    <body>
                        <script>
                            window.onload = function() {
                                window.opener.postMessage({type: 'AUTH_SUCCESS', payload: ${JSON.stringify(
																	result,
																)}}, 'http://localhost:3000/home');
                                window.close();
                            };
                        </script>
                    </body>
                </html>
          `);
		} catch (error) {
			res.send(`
                <html>
                    <body>
                        <script>
                            window.onload = function() {
                                window.opener.postMessage({type: 'AUTH_ERROR', payload: ${JSON.stringify(
																	{
																		error: error.message,
																		authenticated: false,
																		token: null,
																		user: null,
																	},
																)}}, 'http://localhost:3000/home');
                                window.close();
                            };
                        </script>
                    </body>
                </html>
          `);
		}
	},
);

module.exports = router;
