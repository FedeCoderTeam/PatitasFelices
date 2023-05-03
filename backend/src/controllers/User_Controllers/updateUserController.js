const { user, role } = require('../../database/db');

const updateUser = async (id, password, image, isDisabled, roleId) => {
	try {
		let userUpdated = await user.findOne({
			where: { id: id },
		});
		if (!userUpdated) throw new Error(`No se encontró un usuario con id ${id}`);

		await userUpdated.update({
			password: !password ? userUpdated.password : password,
			image: !image ? userUpdated.image : image,
			isDisabled: isDisabled === 'Si' ? true : false,
		});
		if (roleId) {
			let newRole = await role.findOne({
				where: {
					id: roleId,
				},
			});
			await userUpdated.setRole(newRole);
		}
		return 'Se modificó correctamente al usuario';
	} catch (error) {
		return 'Error al intentar actualizar el usuario';
	}
};

module.exports = updateUser;
