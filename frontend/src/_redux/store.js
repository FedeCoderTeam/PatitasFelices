import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './reducer/dogsReducer'
import productsReducer from './reducer/productsReducer';
import authReducer from "./reducer/authReducer";
import requestReducer from './reducer/requestReducer';

export const store = configureStore({
    reducer: {
        dogsReducer,
        productsReducer,
        authReducer,
        requestReducer
    },
})