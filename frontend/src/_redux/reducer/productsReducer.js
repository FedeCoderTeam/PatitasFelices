import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], //filtrado
    allProducts: [], //estado original
    filtered: [], // el que mantiene el filtro aplicado
    productDetail: {},
    category: [],
    subCategory: [],
    sortBy: '',
    sortOrder: '',
    setCategory: "All",
    setSubCategory: "All",
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
        setFilters: (state, action) => {
            if(action.payload.setCategory) {
                state.setCategory = action.payload.setCategory
            }
            if(action.payload.setSubCategory) {
                state.setSubCategory = action.payload.setSubCategory
            }
            if(action.payload.sortOrder && action.payload.sortBy) {
                return{
                    ...state,
                    sortBy: action.payload.sortBy,
                    sortOrder: action.payload.sortOrder,
                }
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
            state.filtered = filtered
        },
        sortProduct: (state) => {
            let ordered = state.products;
            if (state.sortBy === 'price') {
                state.sortOrder === 'asc'
                    ? ordered.sort((a, b) => a.price - b.price)
                    : ordered.sort((a, b) => b.price - a.price);
            }
            if(state.sortBy === 'abc') {
                state.sortOrder === 'asc'
                    ? ordered.sort((a, b) => a.abc - b.abc)
                    : ordered.sort((a, b) => b.abc - a.abc);
            }
            state.products = ordered;
        },
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
    sortProduct,
} = productsSlice.actions

export default productsSlice.reducer