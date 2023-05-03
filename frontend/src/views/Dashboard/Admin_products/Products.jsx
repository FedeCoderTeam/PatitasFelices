import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productsAction from '../../../_redux/actions/productsAction';
import style from './productGrid.module.css';
import { Link } from 'react-router-dom';

const Products = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const allProducts = useSelector((state) => state.productsReducer.allProducts);

	useEffect(() => {
		dispatch(productsAction.getProducts());
	}, [dispatch]);

	const rows = useMemo(
		() =>
			allProducts.map((product) => {
				return {
					id: product.id,
					col1: product.name,
					col2: product.brand,
					col3: `${Number(product.price).toLocaleString('es-AR', {
						style: 'currency',
						currency: 'ARS',
					})}`,
					col4: product.stock,
					col5: product.category,
					col6: product.subCategory,
					col7: product.isDisabled === false ? 'No' : 'Si',
					col8: product.image,
				};
			}),
		[allProducts],
	);

	let ImageCell = ({ value }) => {
		return (
			<img
				src={value}
				alt="Imagen"
				style={{ maxWidth: '2.5em', maxHeight: '6em', objectFit: 'contain' }}
			/>
		);
	};

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key={row.id + 0}
						icon={<EditIcon />}
						label="Edit"
						onClick={() => handleEditClick(row)}
						color="inherit"
					/>,
				];
			},
		},
		{ field: 'id', headerName: 'Id', width: 80 },
		{ field: 'col1', headerName: 'Nombre', width: 420 },
		{ field: 'col2', headerName: 'Marca', width: 150 },
		{ field: 'col3', headerName: 'Precio', width: 150 },
		{ field: 'col4', headerName: 'Stock', width: 150 },
		{ field: 'col5', headerName: 'Categoria', width: 150 },
		{ field: 'col6', headerName: 'Sub-categoria', width: 150 },
		{ field: 'col7', headerName: '¿Descontinuado?', width: 150 },
		{
			field: 'col8',
			headerName: 'Imagen',
			width: 150,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
	];

	const handleEditClick = (row) => {
		dispatch(productsAction.getProductsById(row.id));
		setTimeout(() => {
			navigate('./updateProduct');
		}, 630);
	};

	return (
		<>
			<div className={style.containerBtnNav}>
				<Link to="/dashboard/" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHomeDash}>Home Dashboard</button>
				</Link>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHome}>Home Principal</button>
				</Link>
			</div>
			<button
				className={style.buttonAdd}
				onClick={() => {
					navigate('./createProduct');
				}}
			>
				<AddIcon />
				Agregar Producto
			</button>
			<Box
				sx={{
					height: 'auto',
					width: '100%',
					alignContent: 'center',
					marginTop: '20px',
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						...rows.initialState,
						pagination: { paginationModel: { pageSize: 10 } },
					}}
					pageSizeOptions={[10, Math.floor(rows.length / 2), rows.length]}
				/>
			</Box>
		</>
	);
};

export default Products;
