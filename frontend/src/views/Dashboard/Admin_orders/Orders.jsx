import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Orders.module.css';
import { Link } from 'react-router-dom';
import * as actionOrders from '../../../_redux/actions/mercadopagoAction';

const Orders = () => {
	const allOrders = useSelector((state) => state.mercadopagoReducer.orders);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionOrders.getOrders());
	}, [dispatch]);

	const rows = useMemo(
		() =>
			allOrders.map((ord) => {
				return {
					id: ord.id,
					col1: ord.source,
					col2: `${Number(ord.total).toLocaleString('es-AR', {
						style: 'currency',
						currency: 'ARS',
					})}`,
					col3: ord.user ? `${ord.user.name} ${ord.user.last}` : 'Anonimo',
					col4: new Date(ord.createdAt)
						.toLocaleDateString()
						.replace(/\//g, '-'),
				};
			}),
		[allOrders],
	);

	const columns = [
		{ field: 'id', headerName: 'Id', width: 80 },
		{
			field: 'col1',
			headerName: 'Motivo',
			width: 150,
		},
		{ field: 'col2', headerName: 'Total', width: 250 },
		{ field: 'col3', headerName: 'Usuario', width: 150 },
		{ field: 'col4', headerName: 'Fecha', width: 150 },
	];

	return (
		<>
			<div>
				<div className={style.containerBtnNav}>
					<Link to="/dashboard/" style={{ textDecoration: 'none' }}>
						<button className={style.btnBackHomeDash}>Home Dashboard</button>
					</Link>
					<Link to="/home" style={{ textDecoration: 'none' }}>
						<button className={style.btnBackHome}>Home Principal</button>
					</Link>
				</div>
			</div>
			<Box
				sx={{
					height: 'auto',
					width: '100%',
					alignContent: 'center',
					marginTop: '20px',
				}}
			>
				<DataGrid rows={rows} columns={columns} />
			</Box>
		</>
	);
};

export default Orders;
