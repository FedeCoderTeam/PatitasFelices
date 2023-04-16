import axios from 'axios'
import { 
    getAllProducts,
    getNameProduct,
    getProductDetail,
    setFilters,
    filtered,
    } from '../reducer/productsReducer.js';


const getProducts = () => {
    return async function(dispatch) {
        try {
            let dbData = await axios.get("http://localhost:3001/products")
            dispatch(getAllProducts(dbData.data))
        } catch (error) {
            console.log(error);
        }
    }
}

const getProductsByName = (name) => {
    return async function(dispatch) {
        try {
            const dbData = await axios.get(`http://localhost:3001/products?name=${name}`);
            dispatch(getNameProduct(dbData.data))
        } catch (error) {
            console.log(error);
        }
    }
}

const getProductsById = (id) => {
    return async function(dispatch) {
        try {
            const dbData = await axios.get(`http://localhost:3001/products/${id}`);
            dispatch(getProductDetail(dbData.data))
        } catch (error) {
            console.log(error);
        }
    }
}

const setFilter = (set) => {
    return function(dispatch) {
        dispatch(setFilters(set))
    }
}

const filter = () => {
    return function(dispatch) {
        dispatch(filtered())
    }
}
export {
    getProducts,
    getProductsByName,
    getProductsById,
    setFilter,
    filter
}