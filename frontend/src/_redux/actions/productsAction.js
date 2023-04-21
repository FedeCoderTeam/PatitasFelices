import axios from 'axios';
import {
	getAllProducts,
	getNameProduct,
	getProductDetail,
	setPages,
	setEmptyDetail,
	setFilters,
	filtered,
	sortProduct,
	getSubCategories,
	idSubCategories,
	getByName,
	set_name,
} from '../reducer/productsReducer.js';

const getProducts = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/products');
			dispatch(getAllProducts(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getProductsByName = (name) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(
				`http://localhost:3001/products?name=${name}`,
			);
			dispatch(getNameProduct(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getProductsById = (id) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(`http://localhost:3001/products/${id}`);
			dispatch(getProductDetail(dbData.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getAllsubCategory = () => {
	return async function (dispatch) {
		try {
			const db = await axios.get('http://localhost:3001/subcategories');
			dispatch(getSubCategories(db.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const getIdSubCategory = (num) => {
	return function (dispatch) {
		dispatch(idSubCategories(num));
	};
};

const getName = () => {
	return (dispatch) => {
		dispatch(getByName());
	};
};

const postProduct = (obj) => {
	return async () => {
		try {
			await axios.post('http://localhost:3001/products', obj)
		} catch (error) {
			console.log(error);
		}
	};
};

const updateProduct = (obj) => {
	return async () => {
		try {
			await axios.put('http://localhost:3001/products', obj)
		} catch (error) {
			
		}
	}
}

const setName = (name) => {
	return (dispatch) => {
		dispatch(set_name(name));
	};
};

const setPage = (page) => {
	return (dispatch) => {
		dispatch(setPages(page));
	};
};

const setDetail = () => {
	return (dispatch) => {
		dispatch(setEmptyDetail());
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

const sortAction = () => {
	return function (dispatch) {
		dispatch(sortProduct());
	};
};

const setLinkDePagos = (productDetail) => {
	return async function () {
		try {
			let link = await axios.post(
				'http://localhost:3001/mercadopago/payment',
				productDetail,
			);
			window.location.href = link.data.body.init_point;
		} catch (error) {
			console.log(error);
		}
	};
};

export {
	getProducts,
	getProductsByName,
	getProductsById,
	setPage,
	setDetail,
	setFilter,
	filter,
	sortAction,
	getAllsubCategory,
	getIdSubCategory,
	getName,
	setName,
	setLinkDePagos,
	postProduct,
	updateProduct,
};
