import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isFetching: false,
    isAuthenticated: false,
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
        loginUser: (state, action) => {
            state.user = action.payload
        },
        authUser: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setIsFetching, loginUser, authUser } = authSlice.actions

export default authSlice.reducer