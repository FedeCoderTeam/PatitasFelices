const { event_request_dogs_mail } = require('../../config/mailer');
const { requests, dog } = require('../../database/db')

const postNewRequest = async(
    name,
    age,
    phone,
    address,
    email,
    areas_conditions,
    more_animals,
    moreAnimals_details,
    proper_income,
    inHouse_allowance,
    outDoor_image,
    dogId,
   )=> {
        if (
            !name ||
            !age ||
            !phone ||
            !address ||
            !email ||
            !areas_conditions ||
            more_animals === undefined ||
            !proper_income ||
            !inHouse_allowance ||
            !outDoor_image ||
            !dogId
        ) {
            throw new Error(
                'Falta completar algún o algunos datos obligatorios',
            );
        } else {
            let doguiId = await dog.findOne({
                where: {
                    id: dogId,
                },
            });
            let newRequest = await requests.create({
                name: name,
                age: age,
                phone: phone,
                address: address,
                email: email,
                areas_conditions: areas_conditions,
                more_animals: more_animals,
                moreAnimals_details: moreAnimals_details,
                proper_income: proper_income,
                inHouse_allowance: inHouse_allowance,
                outDoor_image: outDoor_image,              
            });
            await newRequest.setDog(doguiId);

            await event_request_dogs_mail(newRequest.email, newRequest.name)
        }
};

module.exports= postNewRequest;