import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Aprob from '../../utils/animations/Success.json';
import { postOrders } from '../../_redux/actions/mercadopagoAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuccessDonation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = useSelector((state) => state.authReducer.token);

	const [orderGenerated, setOrderGenerated] = useState('No creada');

	const generateOrder = async () => {
		const getDonation = localStorage.getItem('donation');
		const donation = JSON.parse(getDonation);

		const newOrder = {
			status: 'Paid',
			total: donation[0].price,
			payment_method: 'Mercado Pago',
			source: 'Donacion',
			token,
		};

		try {
			dispatch(postOrders(newOrder));
			setOrderGenerated('Creada');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if ((token === null || token !== '') && orderGenerated === 'No creada') {
			generateOrder();
		}
		setTimeout(() => {
			localStorage.setItem('donation', JSON.stringify([]));
			navigate('/donation');
		}, 2000);
	}, [navigate, orderGenerated, token]);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Player
				autoplay
				loop
				src={Aprob}
				style={{
					width: '100%',
					height: '100%',
				}}
			/>
		</div>
	);
};

export default SuccessDonation;
