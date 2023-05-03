import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	allAdoptions: [],
};

export const requestSlice = createSlice({
	name: 'request',
	initialState,
	reducers: {
		setAdoptionDog: (state, action) => {
			if (action.payload !== 'No hay solicitudes de adopción') {
				return {
					allAdoptions: action.payload,
				};
			}

			state.allAdoptions = [];
		},
	},
});

export const { setAdoptionDog } = requestSlice.actions;

export default requestSlice.reducer;
