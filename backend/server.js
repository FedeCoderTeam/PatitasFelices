const server = require('./src/app');
const { conn } = require('./src/database/db');
const dogsTemperaments = require('./src/controllers/Temperaments_Controllers/temperamentsControllers');
const dogsColors = require('./src/controllers/Color_Controllers/colorsControllers');
const dogsGenders = require('./src/controllers/Gender_Controllers/genderControllers');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
	await dogsTemperaments();
	await dogsColors();
	await dogsGenders();
	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
