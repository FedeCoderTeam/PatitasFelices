import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './reducer/dogsReducer'

export const store = configureStore({
    reducer: {
        dogsReducer
    },
})