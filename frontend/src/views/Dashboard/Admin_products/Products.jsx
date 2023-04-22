import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productsAction from '../../../_redux/actions/productsAction';

const Products = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const allProducts = useSelector((state) => state.productsReducer.allProducts);

	const rows = useMemo(
		() =>
			allProducts.map((product) => {
				return {
					id: product.id,
					col1: product.name,
					col2: product.brand,
					col3: product.price,
					col4: product.stock,
					col5: product.category,
					col6: product.subCategory,
					col7: product.isDisabled,
					col8: product.image,
				};
			}),
		[allProducts],
	);

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
		{ field: 'col6', headerName: 'Sub-categoria', width: 200 },
		{ field: 'col7', headerName: '¿Descontinuado?', width: 200 },
		{ field: 'col8', headerName: 'Imagen', width: 150 },
	];

	const handleEditClick = (row) => {
		dispatch(productsAction.getProductsById(row.id));
		navigate('./updateProduct');
	};

	return (
		<>
			<button
				style={{
					background: 'none',
					border: 'none',
					color: 'white',
					fontSize: '20px',
					justifyContent: 'center',
				}}
				onClick={() => {
					navigate('./createProduct');
				}}
			>
				Crear Producto
				<AddCircleOutlinedIcon
					style={{
						fontSize: '30px',
						color: 'white',
					}}
				/>
			</button>
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

export default Products;
