import React, { useMemo, useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import style from './requestGrid.module.css';
import * as requestAction from '../../../_redux/actions/requestAction';

const Request = () => {
	const dispatch = useDispatch();
	const allRequest = useSelector((state) => state.requestReducer.allAdoptions);

	let [edit, setEdit] = useState(false);
	let [editRow, setEditRow] = useState(null);
	let [change, setChange] = useState('');
	const statusOptions = ['Pendiente', 'Aceptada', 'Denegada'];

	useEffect(() => {
		dispatch(requestAction.getAdoptionDog());
	}, [dispatch]);

	const renderSelect = (params) => (
		<Select
			value={params.value}
			onChange={(event) => {
				const value = event.target.value;
				params.api.setEditCellValue({
					id: params.id,
					field: 'col13',
					value,
				});
				setChange(value);
			}}
			sx={{ minWidth: 120 }}
		>
			{statusOptions.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</Select>
	);

	let handleEditClick = (row) => {
		setEdit(true);
		setEditRow(row);
	};

	let saveChange = (row, change) => {
		let obj = {
			id: row.id,
			status:
				change === 'Pendiente'
					? 'Pending'
					: change === 'Aceptada'
					? 'Accepted'
					: 'Denied',
			dogId: row.col12,
		};

		if (row.col13 !== change) {
			dispatch(requestAction.updateAdoptionDog(obj));
		}

		setEdit(false);
		setEditRow(null);
	};

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
					col13:
						request.status === 'Pending'
							? 'Pendiente'
							: request.status === 'Accepted'
							? 'Aceptada'
							: 'Denegada',
					col14: new Date(request.createdAt)
						.toLocaleDateString()
						.replace(/\//g, '-'),
				};
			}),
		[allRequest],
	);

	let bgOnEdit = {
		bg: (params) => (params.row.id === editRow?.id ? style.brown : ''),
	};

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Acciones',
			width: 80,
			cellClassName: 'actions',
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key={row.id}
						icon={<EditIcon />}
						label="Edit"
						onClick={() => handleEditClick(row)}
						color="inherit"
					/>,
					<GridActionsCellItem
						key={row.id}
						icon={<SaveIcon />}
						label="Save"
						onClick={() => saveChange(row, change)}
						color="inherit"
						disabled={!edit}
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
		{
			field: 'col13',
			headerName: 'Solicitud',
			width: 120,
			editable: edit,
			cellClassName: bgOnEdit.bg,
			valueGetter: (params) => params.row.col13,
			valueOptions: statusOptions,
			renderEditCell: renderSelect,
		},
		{ field: 'col14', headerName: 'Creación', width: 100 },
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

export default Request;
