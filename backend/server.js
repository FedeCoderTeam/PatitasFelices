const server = require('./src/app');
const { conn } = require('./src/database/db');
const dogsTemperaments = require('./src/controllers/Temperaments_Controllers/temperamentsControllers');
const dogsColors = require('./src/controllers/Color_Controllers/colorsControllers');
const dogsGenders = require('./src/controllers/Gender_Controllers/genderControllers');
const {
	getAllDogs,
} = require('./src/controllers/Dogs_Controllers/dogsControllers');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
	await dogsTemperaments();
	await dogsColors();
	await dogsGenders();
	await getAllDogs();
	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
