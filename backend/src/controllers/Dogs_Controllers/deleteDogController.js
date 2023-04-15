const { dog} = require('../../database/db');

const deleteDog = async (id) => {
	try {
		let doguiToDelete = await dog.findOne({
			where: {
				id: id,
			},
		});
		if (!doguiToDelete) {
			throw new Error(`No se encontró ningún perro con id ${id}`);
		} else {
			await doguiToDelete.destroy();
			return `El perro con id ${id} se eliminó correctamente`;
		}
	} catch (error) {
		return 'Error al intentar borrar el perro';
	}
};

module.exports= deleteDog;