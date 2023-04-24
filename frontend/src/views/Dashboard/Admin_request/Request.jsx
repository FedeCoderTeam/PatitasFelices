import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import style from './requestGrid.module.css';
// import { useNavigate } from 'react-router-dom';
// import * as requestAction from '../../../_redux/actions/productsAction';

const Request = () => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	const allRequest = useSelector((state) => state.requestReducer.allAdoptions);

	const rows = useMemo(
		() =>
			allRequest.map((request) => {
				return {
					id: request.id,
					col1: request.name,
					col2: request.age,
					col3: request.phone,
					col4: request.address,
					col5: request.email,
					col6: request.areas_conditions,
					col7: request.more_animals,
					col8: request.moreAnimals_details,
					col9: request.proper_income,
					col10: request.inHouse_allowance,
					col11: request.outDoor_image,
					col12: request.dogId,
					col13: request.status,
					col14: new Date(request.createdAt)
						.toLocaleDateString()
						.replace(/\//g, '-'),
				};
			}),
		[allRequest],
	);

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 80,
			cellClassName: 'actions',
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key={row.id + 0}
						icon={<EditIcon />}
						label="Edit"
						// onClick={() => handleEditClick(row)}
						color="inherit"
					/>,
				];
			},
		},
		{ field: 'id', headerName: 'Id', width: 80 },
		{ field: 'col1', headerName: 'Nombre', width: 160 },
		{ field: 'col2', headerName: 'Edad', width: 100 },
		{ field: 'col3', headerName: 'Telefono', width: 120 },
		{ field: 'col4', headerName: 'Direccion', width: 140 },
		{ field: 'col5', headerName: 'Email', width: 150 },
		{ field: 'col6', headerName: 'Patio/balcón ', width: 100 },
		{ field: 'col7', headerName: '¿Animales?', width: 100 },
		{ field: 'col8', headerName: 'Detalles', width: 100 },
		{ field: 'col9', headerName: '¿Economía?', width: 100 },
		{ field: 'col10', headerName: '¿Permisos?', width: 100 },
		{ field: 'col11', headerName: 'Imagen patio/balcón', width: 100 },
		{ field: 'col12', headerName: 'Id perro', width: 100 },
		{ field: 'col13', headerName: 'Solicitud', width: 120 },
		{ field: 'col14', headerName: 'Creación', width: 100 },
	];

	// const handleEditClick = (row) => {
	// 	dispatch(productsAction.getProductsById(row.id));
	// 	navigate('./updateProduct');
	// };

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

export default Request;
