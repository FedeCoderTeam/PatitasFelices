const { Router } = require('express');
const dogsRoute = require('./Dogs_Routes/dogsRoute');
const temperamentsRoute = require('./Temperaments_Routes/temperamentsRoute');
const router = Router();

// router.use('/dogs', dogsRoute);
router.use('/temperaments', temperamentsRoute);

module.exports = router;
