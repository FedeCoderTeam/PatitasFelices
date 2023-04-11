const server = require('./src/app');
const { conn } = require('./src/database/db');
const dogsTemperaments = require('./src/controllers/Temperaments_Controllers/temperamentsControllers');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
	await dogsTemperaments();
	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
