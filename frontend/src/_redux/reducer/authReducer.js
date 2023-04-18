import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFetching: false,
    isRegisterFetching: false,
    isAuthenticated: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
        setIsRegisterFetching: (state, action) => {
            state.isRegisterFetching = action.payload
        },
        setUser: (state, action) => {
            state.isAuthenticated = action.payload.authenticated
            state.user = action.payload.user
        }
    }
})

export const { setIsFetching, setIsRegisterFetching, setUser} = authSlice.actions

export default authSlice.reducer