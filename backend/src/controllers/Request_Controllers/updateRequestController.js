const { requests, dog } = require ("../../database/db") 

let updateRequest = async ( id,
    status,
    dogId,) => {

    try {
        let requestToUpdate = await requests.findOne({ where: { id: id } });

        if(!requestToUpdate) throw new Error(`No se encontró una solicitud con id ${id}`);

        await requestToUpdate.update({
			status: status,
		}); 

        if(status === "Accepted") {

            let dogui = await dog.findOne({
                where: { 
                    id: dogId,
                },
            }); 
            
            await dogui.update({
                adopted: true
            }); 

            return 'Se modificó correctamente la solicitud';
        }
    } catch (error) {
        return 'Error al intentar actualizar la solicitud';
    }
};

module.exports = updateRequest;