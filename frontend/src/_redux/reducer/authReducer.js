import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFetching: false,
    isRegisterFetching: false,
    isAuthenticated: false,
    statusVerify: 'Pending',
    user: null,
    token: '',
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
        setStatusVerify: (state, action) => {
            state.statusVerify = action.payload
        },
        setUser: (state, action) => {
            state.isAuthenticated = action.payload.authenticated
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})

export const { setIsFetching, setIsRegisterFetching, setStatusVerify, setUser} = authSlice.actions

export default authSlice.reducer