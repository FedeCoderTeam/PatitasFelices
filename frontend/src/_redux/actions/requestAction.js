import axios from 'axios';
import { setAdoptionDog } from '../reducer/requestReducer.js';

const URL = 'https://patitas-felices.onrender.com'

const postAdoptionDog = (obj) => {
	return async () => {
		try {
			await axios.post(`${URL}/requests`, obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const updateAdoptionDog = (obj) => {
	console.log(obj)
	return async () => {
		try {
			await axios.put(`${URL}/requests`, obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const getAdoptionDog = () => {
	return async (dispatch) => {
		try {
			let db = await axios.get(`${URL}/requests`);
			dispatch(setAdoptionDog(db.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export { postAdoptionDog, getAdoptionDog, updateAdoptionDog };
