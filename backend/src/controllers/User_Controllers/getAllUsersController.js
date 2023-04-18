const { user, role } = require ('../../database/db')
const usersJson = require ('../../Json/Users.json')

const getAllUsers = async ()=> {
    let data= await user.findAll({
        include: [
			{model: role},
		],
    });

    // if(!data.length) {
    //     let allUsers= usersJson.users;
    //     for (let i = 0; i < allUsers.length; i++) {
    //         let userDb= await user.create({
    //             googleId: allUsers[i].googleId,
    //             name: allUsers[i].name,
    //             last: allUsers[i].last,
    //             email: allUsers[i].email,
    //             password: allUsers[i].password,
    //             image: allUsers[i].image,
    //         });
    //
    //         let roles = await role.findOne({ where: { name: allUsers[i].rol } });
    //         await userDb.setRole(roles);
    //     }
    // }
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

module.exports= getAllUsers;
