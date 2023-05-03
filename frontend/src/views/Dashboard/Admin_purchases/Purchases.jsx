import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionPurchase from '../../../_redux/actions/mercadopagoAction';

const Purchases = () => {
	const allPurchase = useSelector(
		(state) => state.mercadopagoReducer.purchases,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionPurchase.getPurchases());
	}, [dispatch]);

	const rows = useMemo(
		() =>
			allPurchase.map((pur) => {
				return {
					id: pur.id,
					col1: pur.orderId,
					col2: pur.product.name,
					col3: pur.product.brand,
					col4: pur.categoryId === 1 ? 'Alimentos' : 'Accesorios',
					col5:
						pur.product.subCategoryId === 1
							? 'Adulto'
							: pur.product.subCategoryId === 2
							? 'Cachorro'
							: pur.product.subCategoryId === 3
							? 'Comederos'
							: pur.product.subCategoryId === 4
							? 'Collares'
							: pur.product.subCategoryId === 5
							? 'Juguetes'
							: 'Vestimenta',
					col6: `${Number(pur.product.price).toLocaleString('es-AR', {
						style: 'currency',
						currency: 'ARS',
					})}`,
					col7: pur.quantity,
					col8: `${Number(pur.product.price * pur.quantity).toLocaleString(
						'es-AR',
						{
							style: 'currency',
							currency: 'ARS',
						},
					)}`,
					col9: pur.product.image,
					col10: new Date(pur.createdAt)
						.toLocaleDateString()
						.replace(/\//g, '-'),
				};
			}),
		[allPurchase],
	);

	let ImageCell = ({ value }) => {
		return (
			<img
				src={value}
				alt="Imagen"
				style={{ maxWidth: '2em', maxHeight: '6em', objectFit: 'contain' }}
			/>
		);
	};

	const columns = [
		{ field: 'id', headerName: 'Id', width: 80, align: 'center', headerAlign: 'center'},
		{ field: 'col1', headerName: 'N° Orden', width: 150 },
		{ field: 'col2', headerName: 'Producto', width: 350 },
		{ field: 'col3', headerName: 'Marca', width: 150 },
		{ field: 'col4', headerName: 'Categoria', width: 150 },
		{ field: 'col5', headerName: 'Subcategoria', width: 150 },
		{ field: 'col6', headerName: 'Precio', width: 110 },
		{ field: 'col7', headerName: 'Cantidad', width: 100, align: 'center', headerAlign: 'center'},
		{ field: 'col8', headerName: 'Total', width: 150, align: 'center', headerAlign: 'center' },
		{
			field: 'col9',
			headerName: 'Imagen',
			width: 100,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
		{ field: 'col10', headerName: 'Fecha', width: 150, align: 'center', headerAlign: 'center' },
	];

	return (
		<>
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

export default Purchases;
