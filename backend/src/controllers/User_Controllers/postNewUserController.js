const { user, role } = require ('../../database/db')

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


module.exports= postNewUser;