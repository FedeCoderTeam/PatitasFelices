require('dotenv').config();
const axios = require ("axios");
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
        }, { model: race,
            attributes: ["name"],
            through: {attributes: [],}
        }, { model: gender,
            attributes: ["name"],
            through: {attributes: [],}
        }]
    });
    
    let result= data.map((inst)=> {
        return {
            id: inst.id,
            name: inst.name,
            age: inst.age,
            size: inst.size,
            weight: inst.weight,
            castrated: inst.castrated,
            // image ???
            temperament: inst.temperament.map (inst => {})

        }
    })
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