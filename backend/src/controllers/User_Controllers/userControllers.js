const { user, role , session} = require ('../../database/db')
const usersJson = require ('../../Json/Users.json')
const jwt = require('jsonwebtoken')
const {where} = require('sequelize');

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
        let userUpdated= await user.findOne({
            where: {id: id}
        });
        if(!userUpdated){
            throw new Error (`No se encontró un usuario con id ${id}`);
        }
            await userUpdated.update({
                name: name,
                last: last,
                email: email,
                password: password,
                image: image,
                isVerified: isVerified,
                isDisabled: isDisabled,
            });
            if (roles) {
                let newRoles = await role.findOne({
                    where: {
                        name: roles,
                    },
                });
                if(newRoles){
                await userUpdated.setRole(newRoles);
            }
        }

        return 'Se modificó correctamente al usuario';   
    } catch (error) {
		console.log(error);
		return 'Error al intentar actualizar el usuario';
    }
};

const loginUser = async (email, password) => {
    if(!email || !password) throw new Error('Falta completar algún o algunos datos')

    const findUser = await user.findOne({where: {email}})

    if(!findUser) throw new Error('No se encuentra en la base de datos')
    if(findUser.isDisabled) throw new Error('Tu cuenta esta desactivada. Si crees que es un error comunicalo con algun staff.')

    if(findUser.email === email && findUser.password === password) {
        const token = jwt.sign({ user: findUser.dataValues}, "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHY/fLfFMx4BdEsj49b5SqdlY4Ls\n" +
            "cHk2Z8ui3fAPwAFQe9YtOnRFCP4A2IbmuXQgTt98HTNV8OAqsFoX9/zG1v8++WDj\n" +
            "uO+7n2tUY9pvN609L41oKYo0fmo2FVgP5xJMBzuEvHyCU7k9VgOstruEZgDOKxBE\n" +
            "1r2avOYVGbYCBIzZAgMBAAE", {expiresIn: '1h'})
        const findSession = await session.findOne({where: {userId: findUser.id}})
        if(findSession) {
            await session.update({token: token}, {where: {userId: findUser.id}})
        } else {
            await session.create({
                token: token,
                userId: findUser.id
            })
        }

        return {
            authenticated: true,
            token: token,
            user: {
                id: findUser.id,
                name: findUser.name,
                last: findUser.last,
                email: findUser.email,
                image: findUser.image,
                isVerified: findUser.isVerified,
            }
        }
    } else  throw new Error('El email o contraseña no son validos.')
}

const authUser = async (token) => {
    if(!token) throw new Error('You need token')

    const findSession = await session.findOne({where: {token: token}})
    if(!findSession) throw new Error('No exist you token')

    const findUser = await user.findOne({where: {id: findSession.userId}})
    if(!findUser) throw new Error('Not authorized')
    if(findUser.isDisabled) throw new Error('Tu cuenta esta desactivada. Si crees que es un error comunicalo con algun staff.')

    jwt.verify(findSession.token, "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHY/fLfFMx4BdEsj49b5SqdlY4Ls\n" +
        "cHk2Z8ui3fAPwAFQe9YtOnRFCP4A2IbmuXQgTt98HTNV8OAqsFoX9/zG1v8++WDj\n" +
        "uO+7n2tUY9pvN609L41oKYo0fmo2FVgP5xJMBzuEvHyCU7k9VgOstruEZgDOKxBE\n" +
        "1r2avOYVGbYCBIzZAgMBAAE", function (err) {
        if(err) {
            findSession.destroy()
            throw new Error(err)
        }
    })
    return {
        authenticated: true,
        token: findSession.token,
        user: {
            id: findUser.id,
            name: findUser.name,
            last: findUser.last,
            email: findUser.email,
            image: findUser.image,
            isVerified: findUser.isVerified,
        }
    }
}


module.exports= {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUser,
    loginUser,
    authUser
}
