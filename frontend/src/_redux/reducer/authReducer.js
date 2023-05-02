import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isFetching: false,
	isFetchingAuth: false,
	isAuthenticated: false,
	statusVerify: 'Pending',
	showOverlay: false,
	user: null,
	token: '',
	users: [],
	userDetail: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setIsFetchingAuth: (state, action) => {
			state.isFetchingAuth = action.payload;
		},
		setStatusVerify: (state, action) => {
			state.statusVerify = action.payload;
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
		getUserDetail: (state, action) => {
			state.userDetail = action.payload;
		},
	},
});

export const {
	setIsFetching,
	setIsFetchingAuth,
	setStatusVerify,
	setUser,
	setShowOverlay,
	getAllUsers,
	getUserDetail,
} = authSlice.actions;

export default authSlice.reducer;
