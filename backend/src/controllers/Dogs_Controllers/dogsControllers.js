require('dotenv').config();
const { where } = require('sequelize');
const { dog, color, gender, temperament }= require ('../../database/db')

//✅
const getAllDogs = async()=>{
    let data= await dog.findAll({
        include: [{ 
            model: temperament,
            attributes: ["name"],
            through: {attributes: [],}
        },{ model: color,
            attributes: ["name"],
            through: {attributes: [],}
        },{model: gender,
           attributes: ["name"]
        }]
    });
    data= data.filter((inst)=> inst.adopted === false && inst.isDisabled === false
    );
    return data
};


//✅
const getDogsByName = async(name)=>{
    let name2= name.toLowerCase();
    let all= await getAllDogs();
    let result= await all.filter((inst)=> inst.name.toLowerCase().includes(name2));

    if (result.length){
        return result
    }
    else {
        throw new Error (`El perro con nombre ${name} no existe`)
    }
};

//✅
const getDogById = async (id)=>{
    let dogui= await dog.findOne({
        where: {
            id: id
        },
        include: [{
            model: temperament,
            attributes: ["name"],
            through: {attributes: [],}
        },{ model: color,
            attributes: ["name"],
            through: {attributes: [],}
        },{ model: gender,
            attributes: ["name"]
        }]
    })

    if (dogui) {
        return dogui
    }
    else {
        return {error: `El perro con id ${id} no existe`};
    }
};


//✅
const postNewDog = async (name, age, size, weight, castrated, tempers, colors, genders, image)=>{
    if (!name || !age || !size || !weight || !castrated || !tempers || !colors || !genders || !image ) {
        throw new Error ("Falta completar algún o algunos datos (name, age, size, weight, castrated, temperament, color, gender)")
    } else {
        let newDog= await dog.create ({
            name: name,
            age: age,
            size: size,
            weight: weight,
            castrated: castrated,
            image: image,
            // adopted: adopted,
            // isDisabled: isDisabled,
        })
        let temper= await temperament.findAll({
            where: {
                name: tempers
            }
        })
        await newDog.addTemperament(temper);

        let colour= await color.findAll({
            where: {
                name: colors
            }
        })
        await newDog.addColor(colour);

        let genre= await gender.findOne({
            where: {
                name: genders
            }
        })
        await newDog.setGender(genre)
    }
};

//✅
const updateDog= async(name, age, size, weight, castrated, tempers, image, adopted, isDisabled)=>{
    try {
        let doguiToUpdate= await dog.findOne({
            where: {
                id: id
            }
        });
        if (!doguiToUpdate) {
            throw new Error(`No se encontró un perro con id ${id}`)
        }
            await doguiToUpdate.update({
                name: name, 
                age: age, 
                size: size, 
                weight: weight, 
                castrated: castrated,
                image: image,
                adopted: adopted,
                isDisabled: isDisabled
            })
            
            if(tempers) {
                await doguiToUpdate.setTemperament([])
                let newTempers= await temperament.findAll({
                    where: {
                        name: tempers
                    }
                })
                await doguiToUpdate.addTemperament(newTempers)
            }
        return "Se modificó correctamente al perro"

    } catch (error) {
        return "Error al intentar actualizar el perro"
    }
};


//✅
const deleteDog= async(id)=>{
    try {
        let doguiToDelete= await dog.findOne({
            where: {
                id: id
            }
        })
        if (!doguiToDelete) {
            throw new Error (`No se encontró ningún perro con id ${id}`)
        } else {
            await doguiToDelete.destroy();
            return `El perro con id ${id} se eliminó correctamente`
        }
    } catch (error) {
        return "Error al intentar borrar el perro"
    }
};




module.exports= {
    getAllDogs,
    getDogsByName,
    getDogById,
    postNewDog,
    updateDog,
    deleteDog,
}