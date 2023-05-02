import React from 'react';
import { useSelector } from 'react-redux';
const Orders = () => {
	const allOrders = useSelector((state) => state.mercadopagoReducer.orders);
	console.log(allOrders);

	return (
		<div>
			<h4>Recaudaciones</h4>
		</div>
	);
};

export default Orders;
