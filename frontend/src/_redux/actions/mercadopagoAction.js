import axios from 'axios';
import {
	getAllOrders,
	getAllPurchases,
	setNewOrder,
} from '../reducer/mercadopagoReducer';

const setLinkDePagos = (items) => {
	return async function () {
		console.log(items);
		try {
			let link = await axios.post(
				'http://localhost:3001/mercadopago/payment',
				items,
			);
			window.location.href = link.data.body.init_point;
		} catch (error) {
			console.log(error);
		}
	};
};

const getOrders = () => {
	return async function (dispatch) {
		try {
			let ordersDb = await axios.get('http://localhost:3001/orders');
			dispatch(getAllOrders(ordersDb.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const postOrders = (order) => {
	return async function (dispatch) {
		try {
			let newOrder = await axios.post('http://localhost:3001/orders', order);
			if (newOrder.data.source === 'Compra') {
				dispatch(setNewOrder(newOrder.data.id));
			}
			return newOrder.data;
		} catch (error) {
			console.log(error);
		}
	};
};

const getPurchases = (purchase) => {
	return async function (dispatch) {
		try {
			let purchasesDb = await axios.get(
				'http://localhost:3001/purchase',
				purchase,
			);
			dispatch(getAllPurchases(purchasesDb.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const postPurchases = (purchases) => {
	return async function () {
		try {
			let newPurchase = await axios.post(
				'http://localhost:3001/purchase',
				purchases,
			);
			return newPurchase.data;
		} catch (error) {
			console.log(error);
		}
	};
};

const emptyOrder = () => {
	return async function (dispatch) {
		try {
			dispatch(setNewOrder());
		} catch (error) {
			console.log(error);
		}
	};
};

export {
	setLinkDePagos,
	getOrders,
	getPurchases,
	postOrders,
	postPurchases,
	emptyOrder,
};
