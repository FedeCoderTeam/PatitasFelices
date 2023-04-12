const { Router } = require('express');
const dogsRoute = require('./Dogs_Routes/dogsRoute');
const temperamentsRoute = require('./Temperaments_Routes/temperamentsRoute');
const colorsRoute= require('./Colors_Route/colorsRoute');
const gendersRoute= require('./Genders_Route/gendersRoute')
const router = Router();

router.use('/dogs', dogsRoute);
router.use('/temperaments', temperamentsRoute);
router.use('/colors', colorsRoute);
router.use('/genders', gendersRoute);

module.exports = router;
