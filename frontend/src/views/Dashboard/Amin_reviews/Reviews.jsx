import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import * as reviewsAction from '../../../_redux/actions/reviewsAction';
import Star from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useToast from '../../../utils/hooks/useToast';
import style from './Reviews.module.css';
import { Link } from 'react-router-dom';

const Reviews = () => {
	const allReviews = useSelector((state) => state.reviewsReducer.reviews);
	const dispatch = useDispatch();
	const { success, error, warning } = useToast();

	let [edit, setEdit] = useState(false);

	useEffect(() => {
		dispatch(reviewsAction.getReviews());
	}, [dispatch]);

	const rows = useMemo(
		() =>
			allReviews.map((rev) => {
				return {
					id: rev.id,
					col1: rev.rating,
					col2: rev.comment,
					col3: rev.user.name,
					col4: rev.user.last,
					col5: rev.user.email,
					col6: rev.user.image,
					col7: new Date(rev.createdAt)
						.toLocaleDateString()
						.replace(/\//g, '-'),
				};
			}),
		[allReviews],
	);

	const successNotify = () => {
		success('Comentario eliminado', { duration: 2000 });
	};

	const cancelNotify = () => {
		error('Edición cancelada', { duration: 2000 });
	};

	const warningNotify = () => {
		warning('Elige comentario a eliminar', { duration: 2000 });
	};

	let handleEditClick = () => {
		if (!edit) {
			warningNotify();
			setEdit(true);
		}
		if (edit) {
			setEdit(false);
			cancelNotify();
		}
	};

	let daleteReview = (row) => {
		dispatch(reviewsAction.deleteReview(row.id));
		successNotify();
		setEdit(false);
	};

	let ImageCell = ({ value }) => {
		return (
			<img
				src={value}
				alt="Imagen"
				style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
			/>
		);
	};

	let StarCell = ({ value }) => {
		let stars = [];
		for (let i = 0; i < value; i++) {
			stars.push(<Star key={i} sx={{ color: '#ffd700' }} />);
		}
		return <div>{stars}</div>;
	};

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Acciones',
			width: 130,
			cellClassName: 'actions',
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key={row.id}
						icon={<EditIcon />}
						label="Edit"
						onClick={() => handleEditClick()}
						color="inherit"
					/>,
					<GridActionsCellItem
						key={row.id}
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => daleteReview(row)}
						color="inherit"
						disabled={!edit}
					/>,
				];
			},
		},
		{ field: 'id', headerName: 'Id', width: 80, align: 'center' },
		{
			field: 'col1',
			headerName: 'Puntaje',
			width: 170,
			renderCell: (params) => <StarCell value={params.value} />,
		},
		{ field: 'col2', headerName: 'Comentario', width: 350 },
		{ field: 'col3', headerName: 'Nombre', width: 200 },
		{ field: 'col4', headerName: 'Apellido', width: 200 },
		{ field: 'col5', headerName: 'Email', width: 300 },
		{
			field: 'col6',
			headerName: 'Foto',
			width: 130,
			align: 'center',
			renderCell: (params) => <ImageCell value={params.value} />,
		},
		{ field: 'col7', headerName: 'Fecha', width: 130, align: 'center' },
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
				<DataGrid rows={rows} columns={columns} />
			</Box>
		</>
	);
};

export default Reviews;
