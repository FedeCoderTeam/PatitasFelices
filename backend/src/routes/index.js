const { Router } = require('express');
const dogsRoute = require('./Dogs_Routes/dogsRoute');
const temperamentsRoute = require('./Temperaments_Routes/temperamentsRoute');
const colorsRoute = require('./Colors_Route/colorsRoute');
const gendersRoute = require('./Genders_Route/gendersRoute');
const productsRoute = require('./Products_Route/podructsRoute');
const router = Router();

router.use('/dogs', dogsRoute);
router.use('/temperaments', temperamentsRoute);
router.use('/colors', colorsRoute);
router.use('/genders', gendersRoute);
router.use('/products', productsRoute);

module.exports = router;
