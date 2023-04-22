const { dog, requests, user } = require('../../database/db');

const getAllRequests = async()=>{
    let data = await requests.findAll({
        include: [
			{
				model: dog,
			},
            {
				model: user,
			},
		],
    })

    if (!data.length) {
        return "No hay solicitudes de adopción"
    }
    console.log(data)
	return data;
}

module.exports = getAllRequests;
