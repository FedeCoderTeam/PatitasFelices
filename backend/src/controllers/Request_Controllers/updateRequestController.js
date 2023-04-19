const { requests, dog, user } = require ('../../database/db') 
const updateRequest= async ( 
    id,
    status,
    )=> {
        try {
            let requestToUpdate = await requests.findOne({
                where: {
                    id: id,
                },
                include: [
                    { model: dog }
                ]
            });
    
            if (!requestToUpdate) {
                throw new Error(`No se encontró una solicitud con id ${id}`);
            }
            await requests.update({
                status: status
            }, {where: {id: id}})
            if (status === "Accepted") {
                let newDogId = await dog.update(
                    {adopted: true},
                    {
                    where: {
                        id: requestToUpdate.dogId,
                    },
                });
            }
            return 'Se modificó correctamente la solicitud';
        } catch (error) {
            console.log(error);
		    return 'Error al intentar actualizar la solicitud';
        }
    };

module.exports = updateRequest;