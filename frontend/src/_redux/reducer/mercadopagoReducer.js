import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
	purchases: [],
	orderId: null,
};

export const reviewsSlice = createSlice({
	name: 'ordenes',
	initialState,
	reducers: {
		getAllOrders: (state, action) => {
			if (action.payload !== 'No hay solicitudes de adopción') {
				return {
					orders: action.payload,
				};
			}

			state.orders = [];
		},

		getAllPurchases: (state, action) => {
			if (action.payload !== 'No hay solicitudes de adopción') {
				return {
					purchases: action.payload,
				};
			}

			state.purchases = [];
		},

		setNewOrder: (state, action) => {
			state.orderId = action.payload;
		},
	},
});

export const { getAllOrders, getAllPurchases, setNewOrder } =
	reviewsSlice.actions;

export default reviewsSlice.reducer;
