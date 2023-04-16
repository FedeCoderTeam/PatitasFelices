import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFetching: false,
    error: null,
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
        loginUser: (state, action) => {
            state.error = action.payload.error
            state.isAuthenticated = action.payload.authenticated
            state.user = action.payload.user
        },
        authUser: (state, action) => {
            state.error = action.payload.error
            state.isAuthenticated = action.payload.authenticated
            state.user = action.payload.user
        },
        logoutUser: (state, action) => {
            state.error = action.payload.error
            state.isAuthenticated = action.payload.authenticated
            state.user = action.payload.user
        }
    }
})

export const { setIsFetching, loginUser, authUser , logoutUser} = authSlice.actions

export default authSlice.reducer