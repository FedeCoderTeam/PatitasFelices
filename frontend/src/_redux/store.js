import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './reducer/dogsReducer'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        dogsReducer
    },
    /* middleware: [thunk, logger], */
})