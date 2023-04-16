import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [], //filtrado
	allProducts: [], //INMUTABLE
	productDetail: {},
	currentPage: 1,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getAllProducts: (state, action) => {
			state.products = action.payload;
			state.allProducts = action.payload;
		},
		getNameProduct: (state, action) => {
			state.allProducts = action.payload;
		},
		getProductDetail: (state, action) => {
			state.productDetail = action.payload;
		},

		setPages: (state, action) => {
			state.currentPage = action.payload;
		},

		setEmptyDetail: (state) => {
			state.productDetail = {};
		},
	},
});

export const {
	getAllProducts,
	getNameProduct,
	getProductDetail,
	setPages,
	setEmptyDetail,
} = productsSlice.actions;

export default productsSlice.reducer;
