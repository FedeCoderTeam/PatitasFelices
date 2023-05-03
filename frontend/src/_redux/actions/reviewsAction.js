import axios from "axios";
import {
	getAllReviews,
} from '../reducer/reviewsReducer.js';

const URL = 'https://patitas-felices.vercel.app'

const getReviews = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/reviews`);
			dispatch(getAllReviews(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const postReviews = (obj) => {
	return async function () {
		try {
			await axios.post(`${URL}/reviews`, obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const updateReviews = (obj) => {
	return async function () {
		try {
			await axios.put(`${URL}/reviews`, obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const deleteReview = (id) => {
	return async function (dispatch) {
		try {
			let dbData = await axios.delete(`${URL}/reviews/` + id)
			dispatch(getReviews())
			return dbData.data
		} catch (error) {
			console.log(error);
		}
	}
}

const updateReview = (obj) => {
	return async (dispatch) => {
		try {
			let newReview = await axios.put(`${URL}/reviews`, obj);
			dispatch(getReviews());
			return newReview.data;
		} catch (error) {
			console.log(error);
		}
	};
};


export {
    getReviews,
	postReviews,
	updateReviews,
	deleteReview,
	updateReview,
}
