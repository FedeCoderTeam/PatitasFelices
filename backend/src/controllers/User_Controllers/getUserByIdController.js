const { user, role } = require ('../../database/db')

const getUserById= async(id)=>{
    let usuar = await user.findOne({
		where: {
			id: id,
		},
		include: [
			{model: role},
        ],
	});

	if (usuar) {
		return usuar;
	} else {
		return { error: `El usuario con id ${id} no existe` };
	}
};

module.exports = getUserById;