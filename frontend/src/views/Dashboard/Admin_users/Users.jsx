import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
	const allUsers = useSelector((state) => state.authReducer.users);

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
					col7: user.isVerified,
					col8: user.isDisabled,
					col9: user.roleId,
					col10: user.role.name,
				};
			}),
		[allUsers],
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
						key={row.id}
						icon={<EditIcon />}
						label="Edit"
						color="inherit"
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
		{ field: 'col6', headerName: 'Imagen', width: 150 },
		{ field: 'col7', headerName: 'Verificado', width: 150 },
		{ field: 'col8', headerName: 'Desactivado', width: 150 },
		{ field: 'col9', headerName: 'Rol id', width: 150 },
		{ field: 'col10', headerName: 'Rol', width: 150 },
	];

	return (
		<>
			<h2>Usuarios</h2>

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

export default Users;
