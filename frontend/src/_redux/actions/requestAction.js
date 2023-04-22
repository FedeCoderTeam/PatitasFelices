import axios from 'axios';
import { setAdoptionDog } from '../reducer/requestReducer.js';

const postAdoptionDog = (obj) => {
	return async () => {
		try {
			await axios.post('http://localhost:3001/requests', obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const updateAdoptionDog = (obj) => {
	return async () => {
		try {
			await axios.put('http://localhost:3001/requests', obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const getAdoptionDog = () => {
	return async (dispatch) => {
		try {
			let db = await axios.get('http://localhost:3001/requests');
			dispatch(setAdoptionDog(db.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export { postAdoptionDog, getAdoptionDog, updateAdoptionDog };
