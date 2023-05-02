import axios from "axios";
import {
	getAllReviews,
	getDeleteReview,
} from '../reducer/reviewsReducer.js';

const getReviews = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/reviews');
			dispatch(getAllReviews(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const postReviews = (obj) => {
	return async function () {
		try {
			await axios.post('http://localhost:3001/reviews', obj)
		} catch (error) {
			console.log(error);
		}
	}
}

const updateReviews = (obj) => {
	return async function () {
		try {
			await axios.put('http://localhost:3001/reviews', obj)
		} catch (error) {
			console.log(error);
		}
	}
}

const deleteReview = (id) =>{
	return async function (dispatch) {
		try {
			let dbData = await axios.delete('http://localhost:3001/reviews/' + id)
			dispatch(getDeleteReview(dbData.data))
		} catch (error) {
			console.log(error);
		}
	}
}


export {
    getReviews,
	postReviews,
	updateReviews,
	deleteReview,
}