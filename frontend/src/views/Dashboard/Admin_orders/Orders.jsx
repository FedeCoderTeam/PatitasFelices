import React from 'react';
import { useSelector } from 'react-redux';
import style from './Orders.module.css'
import { Link } from 'react-router-dom';

const Orders = () => {
	const allOrders = useSelector((state) => state.mercadopagoReducer.orders);
	console.log(allOrders);

	return (
		<div>
			<h4>Recaudaciones</h4>
			<div className={style.containerBtnNav}>
				<Link to="/dashboard/" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHomeDash}>Home Dashboard</button>
				</Link>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHome}>Home Principal</button>
				</Link>
			</div>
		</div>
	);
};

export default Orders;
