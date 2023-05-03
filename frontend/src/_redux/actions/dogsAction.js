import axios from 'axios';
import {
	setPage,
	setSort,
	setFilter,
	sort,
	filter,
	getAllDogs,
	getAllTemperaments,
	getAllDogsColors,
	getNameDog,
	getGenders,
	getDogDetail,
	setEmptyDetail,
	setMaybeAdoptedDog,
	emptyMaybeAdoptedDog, set_name, getByName,
} from '../reducer/dogsReducer.js';

const URL = 'https://patitas-felices.onrender.com'

const getDogs = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/dogs`);
			dispatch(getAllDogs(dbData.data));
			dispatch(sort())
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
		dispatch(sort());
	};
};

const filterAction = () => {
	return function (dispatch) {
		dispatch(filter());
	};
};

const setPageAction = (page) => {
	return (dispatch) => {
		dispatch(setPage(page));
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

const setSortAction = (age, weight) => {
	return function (dispatch) {
		dispatch(setSort({age, weight}))
	}
}

const setFilterAction = (size, color, gender, temperament) => {
	return function (dispatch) {
		dispatch(setFilter({size, color, gender, temperament}))
	}
}

const setName = (name) => {
	return (dispatch) => {
		dispatch(set_name(name));
	};
};

const getName = () => {
	return (dispatch) => {
		dispatch(getByName());
	};
};



export {
	getDogs,
	getTemperaments,
	getDogsColors,
	sortAction,
	getDogsByName,
	genders,
	filter,
	getDogsById,
	setDetail,
	setPage,
	setMaybeAdoptedDogs,
	emptyMaybeAdoptedDogs,
	postDogs,
	updateDogs,
	setSortAction,
	setFilterAction,
	setPageAction,
	filterAction,
	setName,
	getName
};
