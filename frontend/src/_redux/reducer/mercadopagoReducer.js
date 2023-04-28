import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ordenes: [],
};

export const reviewsSlice = createSlice({
	name: 'ordenes',
	initialState,
	reducers: {},
});

export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;
