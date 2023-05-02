import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Aprob from '../../utils/animations/Success.json';
import { postOrders } from '../../_redux/actions/mercadopagoAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuccessDonation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [orderGenerated, setOrderGenerated] = useState('No creada');

	const generateOrder = async () => {
		const getDonation = localStorage.getItem('donation');
		const donation = JSON.parse(getDonation);

		const newOrder = {
			status: 'Paid',
			total: donation[0].price,
			payment_method: 'Mercado Pago',
			source: 'Donacion',
		};

		try {
			dispatch(postOrders(newOrder));
			setOrderGenerated('Creada');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (orderGenerated === 'No creada') {
			generateOrder();
		}

		setTimeout(() => {
			localStorage.setItem('donation', JSON.stringify([]));
			navigate('/donation');
		}, 2000);
	}, [navigate, orderGenerated]);

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
