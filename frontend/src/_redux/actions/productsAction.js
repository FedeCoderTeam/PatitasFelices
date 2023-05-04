import axios from 'axios';
import {
	setPage,
	setSort,
	setFilter,
	sort,
	filter,
	getAllProducts,
	getNameProduct,
	getProductDetail,
	setEmptyDetail,
	getSubCategories,
	idSubCategories,
	getByName,
	set_name,
	setOpen,
	setItems, getCategories, setIsFetching,
} from '../reducer/productsReducer.js';

const URL = 'https://patitas-felices.onrender.com'

const getProducts = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get(`${URL}/products`);
			dispatch(getAllProducts(dbData.data));
			dispatch(sort())
		} catch (error) {
		}
	};
};

const getProductsByName = (name) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(
				`${URL}/products?name=${name}`,
			);
			dispatch(getNameProduct(dbData.data));
		} catch (error) {
		}
	};
};

const getProductsById = (id) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true))
		try {
			const dbData = await axios.get(`${URL}/products/${id}`);
			dispatch(getProductDetail(dbData.data));
			dispatch(setIsFetching(false))
		} catch (error) {
			dispatch(setIsFetching(false))
		}
	};
};

const getAllsubCategory = () => {
	return async function (dispatch) {
		try {
			const db = await axios.get(`${URL}/subcategories`);
			dispatch(getSubCategories(db.data));
		} catch (error) {
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
			await axios.post(`${URL}/products`, obj);
		} catch (error) {
		}
	};
};

const updateProduct = (obj) => {
	return async () => {
		try {
			await axios.put(`${URL}/products`, obj)
		} catch (error) {}
	}
}

const setName = (name) => {
	return (dispatch) => {
		dispatch(set_name(name));
	};
};

const setPageAction = (page) => {
	return (dispatch) => {
		dispatch(setPage(page));
	};
};

const setDetail = () => {
	return (dispatch) => {
		dispatch(setEmptyDetail());
	};
};

const setFilterAction = (category, subCategory) => {
	return function (dispatch) {
		dispatch(setFilter({category, subCategory}));
	};
};

const filterAction = () => {
	return function (dispatch) {
		dispatch(filter());
	};
};

const sortAction = () => {
	return function (dispatch) {
		dispatch(sort());
	};
};

const setOpenAction = () => {
	return function (dispatch) {
		dispatch(setOpen());
	};
};

const setItemsAction = () => {
	return function (dispatch) {
		const items = localStorage.getItem('products');
		dispatch(setItems(JSON.parse(items)));
	};
};

const setSortAction = (price, name) => {
	return function (dispatch) {
		dispatch(setSort({price, name}))
	}
}

const getCategoriesAction = () =>  {
	return async function(dispatch) {
		try {
			let dbData = await axios.get(`${URL}/categories`);
			dispatch(getCategories(dbData.data));
		} catch (error) {
		}
	}
}

export {
	getProducts,
	getProductsByName,
	getProductsById,
	setPageAction,
	setDetail,
	setFilterAction,
	filterAction,
	sortAction,
	setSortAction,
	getAllsubCategory,
	getIdSubCategory,
	getName,
	setName,
	postProduct,
	updateProduct,
	setOpenAction,
	setItemsAction,
	getCategoriesAction
};
