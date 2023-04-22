const { user, role } = require ('../../database/db')

const getAllUsers = async ()=> {
    return await user.findAll({
        include: [
            {model: role},
        ],
    });
};

module.exports= getAllUsers;
