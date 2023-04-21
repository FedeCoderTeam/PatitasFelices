process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = require('./src/app');
const { conn } = require('./src/database/db');
const dogsTemperaments = require('./src/controllers/Temperaments_Controllers/temperamentsControllers');
const dogsColors = require('./src/controllers/Color_Controllers/colorsControllers');
const dogsGenders = require('./src/controllers/Gender_Controllers/genderControllers');
const getCategory = require('./src/controllers/Category_Controllers/categoryControllers');
const getSubCategory = require('./src/controllers/SubCategory_Controllers/subCategoryControllers');
const getAllProducts = require('./src/controllers/Product_Controllers/productControllers');
const getAllDogs = require('./src/controllers/Dogs_Controllers/getAllDogsController');
const {
	userRoles,
} = require('./src/controllers/Roles_Controllers/rolesControlers');
const getAllUsers = require('./src/controllers/User_Controllers/getAllUsersController');
const http = require('http');

// Syncing all the models at once.
const server = http.createServer(app);

conn.sync({ force: true }).then(async () => {
	try {
		await Promise.all([
			getCategory(),
			await getSubCategory(),
			dogsTemperaments(),
			dogsColors(),
			dogsGenders(),
			userRoles(),
			// getAllUsers(),
			getAllDogs(),
			getAllProducts(),
		]);

		server.listen(3001, () => {
			console.log('%s listening at 3001'); // eslint-disable-line no-console
		});
	} catch (error) {
		console.log(error);
	}
});
