import axios from 'axios';
import {
	getAllTemperaments,
	getAllDogsColors,
	getAllDogs,
	sortDogs,
	getNameDog,
	setFilters,
	filtered,
	getGenders,
	getDogDetail,
	setEmptyDetail,
	setPages,
	setMaybeAdoptedDog,
	emptyMaybeAdoptedDog,
} from '../reducer/dogsReducer.js';

const URL = 'https://patitas-felices.onrender.com'

const getDogs = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/dogs`);
			dispatch(getAllDogs(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const postDogs = (obj) => {
	return async function () {
		try {
			await axios.post(`${URL}/dogs`, obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const updateDogs = (someDog) => {
	return async function () {
		try {
			await axios.put(`${URL}/dogs`, someDog);
		} catch (error) {
			console.log(error);
		}
	};
};

const getDogsById = (id) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(`${URL}/dogs/${id}`);
			dispatch(getDogDetail(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const setDetail = () => {
	return (dispatch) => {
		dispatch(setEmptyDetail());
	};
};

const getDogsByName = (name) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(`${URL}/dogs?name=${name}`);
			dispatch(getNameDog(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getTemperaments = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/temperaments`);
			dispatch(getAllTemperaments(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const genders = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/genders`);
			dispatch(getGenders(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getDogsColors = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/colors`);
			dispatch(getAllDogsColors(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const sortAction = () => {
	return function (dispatch) {
		dispatch(sortDogs());
	};
};

const setFilter = (set) => {
	return function (dispatch) {
		dispatch(setFilters(set));
	};
};

const filter = () => {
	return function (dispatch) {
		dispatch(filtered());
	};
};

const setPage = (page) => {
	return (dispatch) => {
		dispatch(setPages(page));
	};
};
const setMaybeAdoptedDogs = (id) => {
	return (dispatch) => {
		dispatch(setMaybeAdoptedDog(id));
	};
};


const emptyMaybeAdoptedDogs = () => {
	return (dispatch) => {
		dispatch(emptyMaybeAdoptedDog());
	};
};


export {
	getDogs,
	getTemperaments,
	getDogsColors,
	sortAction,
	getDogsByName,
	setFilter,
	genders,
	filter,
	getDogsById,
	setDetail,
	setPage,
	setMaybeAdoptedDogs,
	emptyMaybeAdoptedDogs,
	postDogs,
	updateDogs,
};
