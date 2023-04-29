import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as reviewsAction from '../../../_redux/actions/reviewsAction';
import Star from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

// import StarIcon from '@material-ui/icons/Star';

const Reviews = () => {
	const allReviews = useSelector((state) => state.reviewsReducer.reviews);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(allReviews);

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
					col7: rev.createdAt,
				};
			}),
		[allReviews],
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

	let StarCell = ({ value }) => {
		let stars = [];
		for (let i = 0; i < value; i++) {
			stars.push(<Star key={i} sx={{ color: "#ffd700"}} />);
		}
		return <div>{stars}</div>
	}

	const columns = [
		{ field: 'id', headerName: 'Id', width: 80 },
		{ 
			field: 'col1', 
			headerName: 'Puntaje', 
			width: 150, 
			renderCell: (params) => <StarCell value={params.value} />, 
		},
		{ field: 'col2', headerName: 'Comentario', width: 250 },
		{ field: 'col3', headerName: 'Nombre', width: 150 },
		{ field: 'col4', headerName: 'Apellido', width: 150 },
		{ field: 'col5', headerName: 'Email', width: 250 },
		{
			field: 'col6',
			headerName: 'Foto',
			width: 100,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
		{ field: 'col7', headerName: 'Fecha', width: 150 },
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

export default Reviews;
