const { user, role } = require('../../database/db');
const usersJson = require('../../Json/User.json');

const getAllUsers = async () => {
	let allUsers = await user.findAll({
		include: [{ model: role }],
	});

	if (!allUsers.length) {
		let newUsers = usersJson.users;

		for (let i = 0; i < newUsers.length; i++) {
			let newUser = await user.create({
				id: newUsers[i].id,
				googleId: newUsers[i].googleId,
				name: newUsers[i].name,
				last: newUsers[i].last,
				email: newUsers[i].email,
				password: newUsers[i].password,
				image: newUsers[i].image,
				isVerified: newUsers[i].isVerified,
				isDisabled: newUsers[i].isDisabled,
			});
			let rol = await role.findOne({
				where: {
					id: newUsers[i].roleId,
				},
			});
			await newUser.setRole(rol);
		}
	}
	return allUsers;
};

module.exports = getAllUsers;
