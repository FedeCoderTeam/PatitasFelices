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
import useToast from '../../../utils/hooks/useToast';
import { Link } from 'react-router-dom';

const Request = () => {
	const dispatch = useDispatch();
	const allRequest = useSelector((state) => state.requestReducer.allAdoptions);
	const token = useSelector((state) => state.authReducer.token);
	const { success, error } = useToast();

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
				setChange(value);
				params.api.setEditCellValue({
					id: params.id,
					field: 'col12',
					value,
				});
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

	const successNotify = () => {
		success('Solicitud modificada', { duration: 2000 });
	};

	const cancelNotify = () => {
		error('Edición cancelada', { duration: 2000 });
	};

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
					: change === 'Denegada'
					? 'Denied'
					: row.col12,
			dogId: row.col11,
		};

		if (row.col12 !== change && change !== '') {
			dispatch(requestAction.updateAdoptionDog({ ...obj, token }));
			successNotify();
		} else if (row.col12 === change && change !== '') {
			dispatch(requestAction.updateAdoptionDog({ ...obj, token }));
			successNotify();
		} else {
			cancelNotify();
		}

		setEdit(false);
		setEditRow(null);
		setChange('');
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
					col6: request.more_animals === true ? 'Si' : 'No',
					col7: request.moreAnimals_details,
					col8: request.proper_income === 'Yes' ? 'Si' : 'No',
					col9: request.inHouse_allowance === 'Yes' ? 'Si' : 'No',
					col10: request.outDoor_image,
					col11: request.dogId,

					col12:
						request.status === 'Pending'
							? 'Pendiente'
							: request.status === 'Accepted'
							? 'Aceptada'
							: 'Denegada',
					col13: new Date(request.createdAt)
						.toLocaleDateString()
						.replace(/\//g, '-'),
				};
			}),
		[allRequest],
	);

	let ImageCell = ({ value }) => {
		return (
			<img
				src={value}
				alt="Imagen"
				style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain' }}
			/>
		);
	};

	let bgOnEdit = {
		bg: (params) => (params.row.id === editRow?.id ? style.brown : ''),
	};

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Acciones',
			width: 100,
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
		{
			field: 'id',
			headerName: 'Id',
			width: 50,
			align: 'center',
			headerAlign: 'center',
		},
		{ field: 'col1', headerName: 'Nombre', width: 190 },
		{
			field: 'col2',
			headerName: 'Edad',
			width: 80,
			align: 'center',
			headerAlign: 'center',
		},
		{ field: 'col3', headerName: 'Telefono', width: 120 },
		{ field: 'col4', headerName: 'Direccion', width: 190 },
		{ field: 'col5', headerName: 'Email', width: 150 },
		{
			field: 'col6',
			headerName: '¿Animales?',
			width: 90,
			align: 'center',
			headerAlign: 'center',
		},
		{ field: 'col7', headerName: 'Detalles', width: 120 },
		{
			field: 'col8',
			headerName: '¿Economía?',
			width: 100,
			align: 'center',
			headerAlign: 'center',
		},
		{
			field: 'col9',
			headerName: '¿Permisos?',
			width: 100,
			align: 'center',
			headerAlign: 'center',
		},
		{
			field: 'col10',
			headerName: 'Patio/balcón',
			width: 100,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
		{
			field: 'col11',
			headerName: 'Id perro',
			width: 100,
			align: 'center',
			headerAlign: 'center',
		},
		{
			field: 'col12',
			headerName: 'Solicitud',
			width: 120,
			editable: edit,
			cellClassName: bgOnEdit.bg,
			valueGetter: (params) => params.row.col12,
			valueOptions: statusOptions,
			renderEditCell: renderSelect,
		},
		{ field: 'col13', headerName: 'Creación', width: 100 },
	];

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

export default Request;
