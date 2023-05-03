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
			state.orders = action.payload;
		},

		getAllPurchases: (state, action) => {
			state.purchases = action.payload;
		},

		setNewOrder: (state, action) => {
			state.orderId = action.payload;
		},
	},
});

export const { getAllOrders, getAllPurchases, setNewOrder } =
	reviewsSlice.actions;

export default reviewsSlice.reducer;
