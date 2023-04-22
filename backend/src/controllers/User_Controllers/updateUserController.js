const { user, role } = require ('../../database/db')

const updateUser = async(id, googleId, name, last, email, password, image, roles, isVerified, isDisabled)=>{
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

module.exports = updateUser;