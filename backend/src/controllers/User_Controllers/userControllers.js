const { user, role } = require ('../../database/db')
const usersJson = require ('../../Json/Users.json')

const getAllUsers = async ()=> {
    let data= await user.findAll({
        include: [
			{model: role},
		],
    });

    if(!data.length) {
        let allUsers= usersJson.users;
        for (let i = 0; i < allUsers.length; i++) {
            let userDb= await user.create({
                googleId: allUsers[i].googleId,
                name: allUsers[i].name,
                last: allUsers[i].last,
                email: allUsers[i].email,
                password: allUsers[i].password,
                image: allUsers[i].image,
            });

            let roles = await role.findOne({ where: { name: allUsers[i].rol } });
            console.log(roles)
            await userDb.setRole(roles);
        }
    }
    return data;
};

// const getUsersByName= async(name)=>{
//     let name2 = name.toLowerCase();
// 	let all = await getAllUsers();
// 	let result = all.filter((inst) =>
// 		inst.name.toLowerCase().includes(name2),
// 	);

// 	if (result.length) {
// 		return result;
// 	} else {
// 		throw new Error(`El usuario con nombre ${name} no existe`);
// 	}
// };

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

const postNewUser = async ( name, last, email, password, image, roles) => {
    if (! name || !last || !email || !password || !image ||	!roles) {
		throw new Error ('Falta completar algún o algunos datos');
    } else {
        let newUser = await user.create({
            name: name,
            last: last,
            email: email,
            password: password,
            image: image,
        });
        let rol = await role.findOne({ where: { name: roles } });
        await newUser.setRole(rol);
    }
};

const updateUser= async(id, googleId, name, last, email, password, image, roles, isVerified, isDisabled)=>{
    try {
        let userUpdated= await user.findOne({where: {id: id}});
        if(!userUpdated){
            throw new Error (`No se encontró un usuario con id ${id}`);
        } else {
            await userUpdated.update({
                googleId: googleId,
                name: name,
                last: last,
                email: email,
                password: password,
                image: image,
                isVerified: isVerified,
                isDisabled: isDisabled,
            });
            if (roles) {
                await userUpdated.setRoles([]);
                let newRoles = await role.findAll({
                    where: {
                        name: roles,
                    },
                });
                await userUpdated.addRoles(newRoles);
            }
            return 'Se modificó correctamente al usuario';   
        }
    } catch (error) {
		console.log(error);
		return 'Error al intentar actualizar el usuario';
    }
};


module.exports= {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUser
}
