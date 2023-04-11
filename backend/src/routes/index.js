const { Router } = require('express');
const dogsRoute = require ("./Dogs_Routes/dogsRoute")


const router = Router();

router.use('/dogs', dogsRoute);


module.exports = router;
