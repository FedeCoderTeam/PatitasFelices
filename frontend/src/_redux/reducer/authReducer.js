import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isFetching: false,
	isRegisterFetching: false,
	isSuccess: false,
	isAuthenticated: false,
	statusVerify: 'Pending',
	showOverlay: false,
	user: null,
	token: '',
	users: [],
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setIsRegisterFetching: (state, action) => {
			state.isRegisterFetching = action.payload;
		},
		setStatusVerify: (state, action) => {
			state.statusVerify = action.payload;
		},
		setIsSuccess: (state, action) => {
			state.isSuccess = action.payload
		},
		setShowOverlay: (state, action) => {
			state.showOverlay = action.payload;
		},
		setUser: (state, action) => {
			state.isAuthenticated = action.payload.authenticated;
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		getAllUsers: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const {
	setIsFetching,
	setIsRegisterFetching,
	setStatusVerify,
	setIsSuccess,
	setUser,
	setShowOverlay,
	getAllUsers,
} = authSlice.actions;

export default authSlice.reducer;
