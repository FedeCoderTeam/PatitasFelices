import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], //filtrado
    allProducts: [], //estado original
}

export const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers: {
        getAllProducts: (state, action) => {
            state.products = action.payload
            state.allProducts = action.payload
        }
    }
})

export const {
    getAllProducts,
    
} = productsSlice.actions

export default productsSlice.reducer