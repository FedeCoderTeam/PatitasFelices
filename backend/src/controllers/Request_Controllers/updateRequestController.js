const { requests, dog } = require('../../database/db');
const {event_rejected_adoption} = require('../../utils/email');
const {verifyToken} = require('../../utils/token');

let updateRequest = async (id, status, dogId, token) => {
	try {
		const infoUser = await verifyToken(token, process.env.JWT_PRIVATE_KEY_AUTH);

		if (infoUser.user.role.name !== 'Administrador') throw new Error(`Error al intentar actualizar la solicitud`);
		// return 'Error al intentar actualizar la solicitud';

		let requestToUpdate = await requests.findOne({ where: { id: id } });

		if (!requestToUpdate)
			throw new Error(`No se encontró una solicitud con id ${id}`);

		if (status === 'Accepted' || status === 'Denied' || status === 'Pending') {
			await requests.update({
				status: status,
			});
		}

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
			if(requestToUpdate.status === 'Accepted') {
				await dogui.update({
					adopted: false,
				});
			}

			await event_rejected_adoption(requestToUpdate.id, requestToUpdate.email)

			return 'Se modificó correctamente la solicitud';
		}
	} catch (error) {
		return 'Error al intentar actualizar la solicitud';
	}
};

module.exports = updateRequest;
