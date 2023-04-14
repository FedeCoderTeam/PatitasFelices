import axios from 'axios'
import { 
    getAllTemperaments,
    getAllDogsColors, 
    getAllDogs, 
    setSort, 
    sortDogs, 
    setfilterByWeigth, 
    setfilterBySize, 
    setfilterByAge,
    getNameDog,
} from "../reducer/dogsReducer.js";


const getDogs = () => {
    return async function(dispatch) {
        try {
            let dbData = await axios.get("http://localhost:3001/dogs")
            dispatch(getAllDogs(dbData.data));
        } catch (error) {
            console.log(error);
        }
    } 
}

const getDogsByName = (id) => {
    return async function(dispatch) {
        try {
            const dbData = await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch(getNameDog(dbData.data))
        } catch (error) {
            console.log(error);
        }
    }
}

const getTemperaments = () => {
    return async function(dispatch) {
        try {
            let dbData = await axios.get("http://localhost:3001/temperaments")
            dispatch(getAllTemperaments(dbData.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const getDogsColors = () => {
    return async function(dispatch) {
        try {
            let dbData = await axios.get("http://localhost:3001/colors")
            dispatch(getAllDogsColors(dbData.data))
        } catch (error) {
            console.log(error);
        }
    }
}

const sortAction = (sortBy, sortOrder) => {
    return function (dispatch) {
        dispatch(setSort({ sortBy, sortOrder }))
        dispatch(sortDogs())
    }
}

export {
    getDogs,
    getTemperaments,
    getDogsColors,
    sortAction,
    getDogsByName,
}