import axios from 'axios'
import { getAllTemperaments, getAllDogsColors } from "../reducer/dogsReducer.js";


const getDogs = () => {
    return async function(dispatch) {
        try {
            // await axios.get(/* API */)
        } catch (error) {
            console.log(error);
        }
    } 
}

const getTemperaments = () => {
    return async function(dispatch) {
        try {
            let apiData = await axios.get("http://localhost:3001/temperaments")
            dispatch(getAllTemperaments(apiData.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const getDogsColors = () => {
    return async function(dispatch) {
        try {
            let apiData = await axios.get("http://localhost:3001/colors")
            dispatch(getAllDogsColors(apiData.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    getDogs,
    getTemperaments,
    getDogsColors
}