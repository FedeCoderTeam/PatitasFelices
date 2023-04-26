const { user, role } = require ('../../database/db')
const usersJson= require ('../../Json/User.json')

const getAllUsers = async ()=> {
    let allUsers= await user.findAll({
        include: [
            { model: role },
        ]
    });

    if(!allUsers.length) {
        let userPatitas= usersJson.users[0]
        let happyPaws= await user.create({
            id: userPatitas.id,
            googleId: userPatitas.googleId,
            name: userPatitas.name,
            last: userPatitas.last,
            email: userPatitas.email,
            password: userPatitas.password,
            image: userPatitas.image,
            isVerified: userPatitas.isVerified,
            isDisabled: userPatitas.isDisabled,
        });
        let rol= await role.findOne({
            where: {
                id: userPatitas.roleId
            }
        });
        await happyPaws.setRole(rol)      
    }
    return allUsers
};

module.exports= getAllUsers;
