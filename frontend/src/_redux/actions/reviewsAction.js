import axios from "axios";
import {getAllReviews} from '../reducer/reviewsReducer.js';

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

export {
    getReviews,
}