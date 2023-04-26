const { requests, dog } = require('../../database/db');
// const jwt = require('jsonwebtoken');

let updateRequest = async (id, status, dogId) => {
	try {
		// const infoUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY_AUTH);

		// if (infoUser.user.role.name !== 'Administrador')
		// 	return 'Error al intentar actualizar la solicitud';

		let requestToUpdate = await requests.findOne({ where: { id: id } });

		if (!requestToUpdate)
			throw new Error(`No se encontró una solicitud con id ${id}`);

		await requestToUpdate.update({
			status: status,
		});

		if (status === 'Accepted') {
			let dogui = await dog.findOne({
				where: {
					id: dogId,
				},
			});

			await dogui.update({
				adopted: true,
			});

			return 'Se modificó correctamente la solicitud';
		}

		if (!requestToUpdate)
			throw new Error(`No se encontró una solicitud con id ${id}`);

		await requestToUpdate.update({
			status: status,
		});

		if (status === 'Denied') {
			let dogui = await dog.findOne({
				where: {
					id: dogId,
				},
			});

			await dogui.update({
				adopted: false,
			});

			return 'Se modificó correctamente la solicitud';
		}
	} catch (error) {
		return 'Error al intentar actualizar la solicitud';
	}
};

module.exports = updateRequest;
