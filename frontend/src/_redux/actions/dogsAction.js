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
	emptyMaybeAdoptedDog,
} from '../reducer/dogsReducer.js';

const getDogs = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/dogs');
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
			await axios.post('http://localhost:3001/dogs', obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const updateDogs = (someDog) => {
	return async function () {
		try {
			await axios.put('http://localhost:3001/dogs', someDog);
		} catch (error) {
			console.log(error);
		}
	};
};

const getDogsById = (id) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(`http://localhost:3001/dogs/${id}`);
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
			const dbData = await axios.get(`http://localhost:3001/dogs?name=${name}`);
			dispatch(getNameDog(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getTemperaments = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/temperaments');
			dispatch(getAllTemperaments(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const genders = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/genders');
			dispatch(getGenders(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getDogsColors = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/colors');
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
	filterAction
};
