import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFetching: false,
    isRegisterFetching: false,
    isAuthenticated: false,
    statusVerify: 'Pending',
    showOverlay: false,
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
        setShowOverlay: (state, action) => {
            state.showOverlay = action.payload
        },
        setUser: (state, action) => {
            state.isAuthenticated = action.payload.authenticated
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})

export const { setIsFetching, setIsRegisterFetching, setStatusVerify, setUser, setShowOverlay } = authSlice.actions

export default authSlice.reducer