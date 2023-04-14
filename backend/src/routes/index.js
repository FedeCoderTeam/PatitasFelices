const { Router } = require('express');
const dogsRoute = require('./Dogs_Routes/dogsRoute');
const temperamentsRoute = require('./Temperaments_Routes/temperamentsRoute');
const productsRoute = require('./Products_Route/podructsRoute');
const colorsRoute= require('./Colors_Route/colorsRoute');
const gendersRoute= require('./Genders_Route/gendersRoute')
const usersRoute= require('./Users_Routes/usersRoute');
const rolesRoutes= require ('./Roles_Routes/rolesRoutes')
const router = Router();

router.use('/dogs', dogsRoute);
router.use('/temperaments', temperamentsRoute);
router.use('/colors', colorsRoute);
router.use('/genders', gendersRoute);
router.use('/products', productsRoute);
router.use('/roles', rolesRoutes);
router.use('/users', usersRoute);

module.exports = router;
