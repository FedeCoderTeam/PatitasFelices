import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '@/_redux/reducer/counterSlice';
import personReducer from '@/_redux/reducer/personReducer';


export const store = configureStore({
    reducer: {
        counterReducer,
        personReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;