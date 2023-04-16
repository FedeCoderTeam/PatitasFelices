import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], //filtrado
    allProducts: [], //estado original
    category: [],
    subCategory: [],
    setCategory: "All",
    setSubCategory: "All",
}

export const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers: {
        getAllProducts: (state, action) => {
            state.products = action.payload
            state.allProducts = action.payload
        },
        getNameProduct: (state, action) => {
            state.allProducts = action.payload
        },
        getProductDetail: (state, action) => {
            state.allProducts = action.payload
        },
        setFilters: (state, action) => {
            if(action.payload.setCategory) {
                return{
                    ...state,
                    setCategory: action.payload.setCategory,
                }
            }
            if(action.payload.setSubCategory) {
                return {
                    ...state,
                    setSubCategory: action.payload.setSubCategory,
                }
            }
            return{
                ...state
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
            return {
                ...state,
                products: filtered,
                filtered: filtered
            }
        }
    }
})

export const {
    getAllProducts,
    getNameProduct,
    getProductDetail,
    setFilters,
    filtered,
} = productsSlice.actions

export default productsSlice.reducer