import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], //filtrado
    allProducts: [], //estado original
    productDetail: {},
    currentPage: 1,
    category: [],
    subCategory: [],
    setCategory: "All",
    setSubCategory: "All",
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
        setFilters: (state, action) => {
            if(action.payload.setCategory) {
                state.setCategory = action.payload.setCategory
            }
            if(action.payload.setSubCategory) {
                state.setSubCategory = action.payload.setSubCategory
            }
        },
        filtered: (state) => {
            let filtered = state.allProducts

            if(state.setCategory !== "All") {
                filtered = filtered.filter((el) => el.category.includes(state.setCategory))
            }
            if(state.setSubCategory !== "All") {
                filtered = filtered.filter((el) => el.subCategory.includes(state.setSubCategory))
            }
            state.products = filtered
            // state.filtered = filtered
        }
	},
});

export const {
    getAllProducts,
    getNameProduct,
    setPages,
    getProductDetail,
    setEmptyDetail,
    setFilters,
    filtered,
} = productsSlice.actions

export default productsSlice.reducer