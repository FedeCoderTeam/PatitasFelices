import React, { useMemo, useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import style from './User.module.css';
import * as authActions from '../../../_redux/actions/authAction';
import useToast from '../../../utils/hooks/useToast';
import { Link } from 'react-router-dom';

const Users = () => {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.authReducer.users);
	const { success, error } = useToast();

	let [edit, setEdit] = useState(false);
	let [editRow, setEditRow] = useState(null);
	let [change, setChange] = useState('');
	let [disabled, setDisabled] = useState('');
	const rolesOptions = ['Administrador', 'Moderador', 'Usuario'];
	const disabledOptions = ['Si', 'No'];

	useEffect(() => {
		dispatch(authActions.getUsers());
	}, [dispatch]);

	const renderSelect = (params) => (
		<Select
			value={params.value}
			onChange={(event) => {
				const value = event.target.value;
				setChange(value);

				params.api.setEditCellValue({
					id: params.id,
					field: 'col9',
					value,
				});
			}}
			sx={{ minWidth: 120 }}
		>
			{rolesOptions.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</Select>
	);

	const renderSelect2 = (params) => (
		<Select
			value={params.value}
			onChange={(event) => {
				const value = event.target.value;
				setDisabled(value);

				params.api.setEditCellValue({
					id: params.id,
					field: 'col8',
					value,
				});
			}}
			sx={{ minWidth: 120 }}
		>
			{disabledOptions.map((option) => (
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

	let saveChange = (row) => {
		let obj = {
			id: allUsers[row.id - 1].id,
			password: row.col5,
			image: row.col6,
			isDisabled: disabled === 'Si' ? 'Si' : 'No',
			roleId: change === 'Administrador' ? 1 : change === 'Moderador' ? 2 : 3,
		};

		if (
			(row.col9 !== change && change !== '') ||
			(row.col8 !== disabled && disabled !== '')
		) {
			dispatch(authActions.updateUser(obj));
			successNotify();
		} else if (
			(row.col9 === change && change !== '') ||
			(row.col8 === disabled && disabled !== '')
		) {
			dispatch(authActions.updateUser(obj));

			successNotify();
		} else {
			cancelNotify();
		}

		setEdit(false);
		setEditRow(null);
		setChange('');
		setDisabled('');
	};

	const rows = useMemo(
		() =>
			allUsers.map((user, index) => {
				return {
					id: index + 1,
					col1: user.googleId ? user.googleId : 'N/A',
					col2: user.name,
					col3: user.last,
					col4: user.email,
					col5: user.password,
					col6: user.image,
					col7: user.isVerified === true ? 'Si' : 'No',
					col8: user.isDisabled === true ? 'Si' : 'No',
					col9: user.role.name,
				};
			}),
		[allUsers],
	);

	let ImageCell = ({ value }) => {
		return (
			<img
				src={value}
				alt="Imagen"
				style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
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
			headerName: 'Actions',
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
		{ field: 'id', headerName: 'Id', width: 80 },
		{ field: 'col1', headerName: 'Google id', width: 200 },
		{ field: 'col2', headerName: 'Nombre', width: 130 },
		{ field: 'col3', headerName: 'Apellido', width: 130 },
		{ field: 'col4', headerName: 'Email', width: 240 },
		{ field: 'col5', headerName: 'Contraseña', width: 150 },
		{
			field: 'col6',
			headerName: 'Imagen',
			width: 150,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
		{ field: 'col7', headerName: 'Verificado', width: 150 },
		{
			field: 'col8',
			headerName: 'Desactivado',
			width: 150,
			editable: edit,
			cellClassName: bgOnEdit.bg,
			valueGetter: (params) => params.row.col8,
			valueOptions: disabledOptions,
			renderEditCell: renderSelect2,
		},
		{
			field: 'col9',
			headerName: 'Rol',
			width: 150,
			editable: edit,
			cellClassName: bgOnEdit.bg,
			valueGetter: (params) => params.row.col9,
			valueOptions: rolesOptions,
			renderEditCell: renderSelect,
		},
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
					width: 'auto',
					alignContent: 'center',
					marginTop: '20px',
				}}
			>
				<DataGrid rows={rows} columns={columns} />
			</Box>
		</>
	);
};

export default Users;
