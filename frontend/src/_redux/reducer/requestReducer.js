import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	allAdoptions: [],
};

export const requestSlice = createSlice({
	name: 'request',
	initialState,
	reducers: {
		setAdoptionDog: (state, action) => {
			if (typeof action.payload === 'object') {
				state.allAdoptions = action.payload;
			}

			state.allAdoptions = [];
		},
	},
});

export const { setAdoptionDog } = requestSlice.actions;

export default requestSlice.reducer;
