import axios from 'axios';
import {
	getAllOrders,
	getAllPurchases,
	setNewOrder,
} from '../reducer/mercadopagoReducer';

const URL = 'https://patitas-felices.onrender.com'

const setLinkDePagos = (items) => {
	return async function () {
		try {
			let link = await axios.post(
				`${URL}/mercadopago/payment`,
				items,
			);
			window.location.href = link.data.body.init_point;
		} catch (error) {
		}
	};
};

const getOrders = () => {
	return async function (dispatch) {
		try {
			let ordersDb = await axios.get(`${URL}/orders`);
			dispatch(getAllOrders(ordersDb.data));
		} catch (error) {
		}
	};
};

const postOrders = (order) => {
	return async function (dispatch) {
		try {
			let newOrder = await axios.post(`${URL}/orders`, order);
			if (newOrder.data.source === 'Compra') {
				dispatch(setNewOrder(newOrder.data.id));
			}
			return newOrder.data;
		} catch (error) {
		}
	};
};

const getPurchases = (purchase) => {
	return async function (dispatch) {
		try {
			let purchasesDb = await axios.get(
				`${URL}/purchase`,
				purchase,
			);
			dispatch(getAllPurchases(purchasesDb.data));
		} catch (error) {
		}
	};
};

const postPurchases = (purchases) => {
	return async function () {
		try {
			let newPurchase = await axios.post(
				`${URL}/purchase`,
				purchases,
			);
			return newPurchase.data;
		} catch (error) {
		}
	};
};

const emptyOrder = () => {
	return async function (dispatch) {
		try {
			dispatch(setNewOrder());
		} catch (error) {
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
