import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as dogsAction from '../../../_redux/actions/dogsAction';
import style from './dogsGrid.module.css';

const DogsGrid = () => {
	const allDogs = useSelector((state) => state.dogsReducer.allDogs);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(dogsAction.getDogs());
	}, [dispatch]);

	const rows = useMemo(
		() =>
			allDogs.map((dog) => {
				return {
					id: dog.id,
					col1: dog.name,
					col2: dog.age,
					col3: dog.size,
					col4: dog.weight,
					col5: dog.castrated,
					col6: dog.temperaments,
					col7: dog.colors,
					col8: dog.gender,
					col9: dog.adopted,
					col10: dog.isDisabled,
					col11: dog.image,
				};
			}),
		[allDogs],
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

	const handleEditClick = (row) => {
		dispatch(dogsAction.getDogsById(row.id));
		navigate('./updateDog');
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
		{ field: 'col1', headerName: 'Nombre', width: 120 },
		{ field: 'col2', headerName: 'Edad', width: 105 },
		{ field: 'col3', headerName: 'Tamaño', width: 120 },
		{ field: 'col4', headerName: 'Peso', width: 110 },
		{ field: 'col5', headerName: 'Castrado', width: 130 },
		{ field: 'col6', headerName: 'Temperamentos', width: 240 },
		{ field: 'col7', headerName: 'Colores', width: 150 },
		{ field: 'col8', headerName: 'Genero', width: 120 },
		{ field: 'col9', headerName: '¿Adoptado?', width: 150 },
		{ field: 'col10', headerName: '¿Muerto?', width: 140 },
		{
			field: 'col11',
			headerName: 'Imagen',
			width: 220,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
	];

	return (
		<>
			<button
				className={style.buttonAdd}
				onClick={() => {
					navigate('/dashboard/dogs/createDog');
				}}
			>
				<AddIcon />
				Agregar Perro
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

export default DogsGrid;
