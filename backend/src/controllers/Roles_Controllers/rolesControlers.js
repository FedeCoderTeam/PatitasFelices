const { role } = require('../../database/db');
const rolesJson = require('../../Json/Roles.json');

const userRoles = async () => {
	try {
		let roles = await role.findAll({
			attributes: ['id', 'name'],
		});

		if (!roles.length) {
			let allRoles = rolesJson.roles;

			allRoles = allRoles.map((el, index) => {
				return { id: index + 1, name: el };
			});

			await role.bulkCreate(allRoles);
		}

		return roles;
	} catch (error) {
		return { error: 'No hay roles disponibles en la DB' };
	}
};

module.exports = {userRoles};