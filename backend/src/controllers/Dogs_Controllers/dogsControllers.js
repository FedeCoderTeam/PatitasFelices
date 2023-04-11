require('dotenv').config();
const { dog, color, race, gender, temperament }= require ('../../database/db')


const getAllDogs = async()=>{
    let data= await dog.findAll({
        include: [{ 
            model: temperament,
            attributes: ["name"],
            through: {attributes: [],}
        },{ model: color,
            attributes: ["name"],
            through: {attributes: [],}
        },{model: race,
           attributes: ["name"],
        },{model: gender,
           attributes: ["name"]
        }]
    });
    
    return data;
};

const getDogsByName = async(name)=>{};

const getDogById = ()=>{};

const postNewDog = ()=>{};

const updateDog= ()=>{};

const deleteDog= ()=>{};




module.exports= {
    getAllDogs,
    getDogsByName,
    getDogById,
    postNewDog,
    updateDog,
    deleteDog,
}