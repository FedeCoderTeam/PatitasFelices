const server = require('./src/app');
const { conn } = require('./src/database/db');
const dogsTemperaments = require('./src/controllers/Temperaments_Controllers/temperamentsControllers');
const dogsColors = require('./src/controllers/Color_Controllers/colorsControllers');
const dogsGenders = require('./src/controllers/Gender_Controllers/genderControllers');
const getCategory = require('./src/controllers/Category_Controllers/categoryControllers');
const getSubCategory = require('./src/controllers/SubCategory_Controllers/subCategoryControllers');
const getAllProducts = require('./src/controllers/Product_Controllers/productControllers');
const { getAllDogs } = require('./src/controllers/Dogs_Controllers/dogsControllers');
const { userRoles } = require('./src/controllers/Roles_Controllers/rolesControlers')
const { getAllUsers } = require('./src/controllers/User_Controllers/userControllers');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
	await dogsTemperaments();
	await dogsColors();
	await dogsGenders();
	await getAllDogs();
	await userRoles();
	await getAllUsers();
	await getCategory();
	await getSubCategory();
	await getAllProducts();

	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
