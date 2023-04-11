const { Router } = require ("express");
const { getAllDogs, getDogsByName } = require ("../../controllers/Dogs_Controllers/dogsControllers")



const router = Router();

//GET ALL DOGS //BY NAME AND ALL CLIENT
router.get('/', async (req, res)=> {
    const {name}= req.query;
    try {
        if(!name) {
            let result= await getAllDogs();
            return res.status(200).json(result);
        }
        else {
            let result= await getDogsByName(name);
            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }

})

//GET BY ID WIHT DETAIL CLIENT


//POST DOGS CLIENT


//UPDATE DOGS ADMIN


//DELETE DOGS ADMIN
