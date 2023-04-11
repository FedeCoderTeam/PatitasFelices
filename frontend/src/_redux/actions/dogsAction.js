import axios from 'axios'

const getAllDogs = () => {
    return async function(dispatch) {
        try {
            // await axios.get(/* API */)
        } catch (error) {
            console.log(error);
        }
    } 
}

const getAllTemperaments = async () => {
    return async function(dispatch) {
        try {
            
        } catch (error) {            
            console.log(error);
        }
    }
}

export {
    getAllDogs,
    getAllTemperaments
}