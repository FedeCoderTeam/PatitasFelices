import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './reducer/dogsReducer'
import productsReducer from './reducer/productsReducer.js';

export const store = configureStore({
    reducer: {
        dogsReducer,
        productsReducer
    },
})