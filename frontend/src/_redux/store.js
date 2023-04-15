import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './reducer/dogsReducer'
import productsReducer from './reducer/productsReducer';
import authReducer from "./reducer/authReducer";

export const store = configureStore({
    reducer: {
        dogsReducer,
        productsReducer,
        authReducer,
    },
})