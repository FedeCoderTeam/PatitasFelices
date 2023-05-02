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
	setItems, getCategories,
} from '../reducer/productsReducer.js';

const getProducts = () => {
	return async function (dispatch) {
		try {
			let dbData = await axios.get('http://localhost:3001/products');
			dispatch(getAllProducts(dbData.data));
			dispatch(sort())
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
			await axios.post('http://localhost:3001/products', obj);
		} catch (error) {
			console.log(error);
		}
	};
};

const updateProduct = (obj) => {
	return async () => {
		try {
			console.log('Llegue a redux');
			await axios.put('http://localhost:3001/products', obj);
		} catch (error) {}
	};
};

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
			let dbData = await axios.get('http://localhost:3001/categories');
			dispatch(getCategories(dbData.data));
		} catch (error) {
			console.log(error);
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
