const { Router } = require('express');
const dogsRoute = require('./Dogs_Routes/dogsRoute');
const temperamentsRoute = require('./Temperaments_Routes/temperamentsRoute');
const productsRoute = require('./Products_Route/podructsRoute');
const colorsRoute = require('./Colors_Route/colorsRoute');
const gendersRoute = require('./Genders_Route/gendersRoute');
const usersRoute = require('./Users_Routes/usersRoute');
const rolesRoutes = require('./Roles_Routes/rolesRoutes');
const subCategoriesRoutes = require('./Sub_Categories_Route/subCategoriesRoutes');
const cloudinaryRoute = require('./Cloudinary_Route/cloudinaryRoute');
const mercadopagoRoute = require('./Mercado_Pago_Route/mercadopagoRoute');
const requestsRoutes = require ('../routes/Requests_Routes/requestsRoutes')
const googleRoutes = require('../routes/Users_Routes/googleRoute')

const router = Router();

router.use('/dogs', dogsRoute);
router.use('/temperaments', temperamentsRoute);
router.use('/colors', colorsRoute);
router.use('/genders', gendersRoute);
router.use('/products', productsRoute);
router.use('/roles', rolesRoutes);
router.use('/users', usersRoute);
router.use('/subcategories', subCategoriesRoutes);
router.use('/mercadopago', mercadopagoRoute);
router.use('/cloudinary', cloudinaryRoute)
router.use('/requests', requestsRoutes);
router.use('/auth', googleRoutes);

module.exports = router;
