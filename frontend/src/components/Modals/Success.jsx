import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Aprob from '../../utils/animations/Success.json';
import {
	setItemsAction,
	updateProduct,
} from '../../_redux/actions/productsAction';
import {
	postOrders,
	postPurchases,
	emptyOrder,
} from '../../_redux/actions/mercadopagoAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Success = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const shoppingCart = useSelector(
		(state) => state.productsReducer.shoppingCart,
	);
	const allProducts = useSelector((state) => state.productsReducer.allProducts);
	const token = useSelector((state) => state.authReducer.token);
	const orderId = useSelector((state) => state.mercadopagoReducer.orderId);

	const [orderGenerated, setOrderGenerated] = useState('No creada');
	const [purchaseGenerated, setPurchaseGenerated] = useState('No creada');

	const cartItems = allProducts
		?.filter((p) => shoppingCart?.items?.some((s) => s.id === p.id))
		.map((p) => ({
			...p,
			quantity: shoppingCart?.items?.find((s) => s.id === p.id).quantity,
		}));

	const generateOrder = async () => {
		const newOrder = {
			status: 'Paid',
			total: cartItems.reduce((accumulator, currentValue) => {
				return accumulator + Number(currentValue.price) * currentValue.quantity;
			}, 0),
			payment_method: 'Mercado Pago',
			source: 'Compra',
			token,
		};

		try {
			dispatch(postOrders(newOrder));
			setOrderGenerated('Creada');

			const promises = cartItems.map((item) => {
				return dispatch(updateProduct(item));
			});

			await Promise.all(promises);
		} catch (error) {
			console.error(error);
		}
	};

	const generatePurchase = async () => {
		try {
			const purchases = cartItems?.map(({ id, quantity }) => ({
				idProduct: id,
				quantity,
				idOrder: orderId,
			}));
			dispatch(postPurchases(purchases));
			dispatch(emptyOrder());
			setPurchaseGenerated('Creada');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (
			token !== 'null' &&
			cartItems?.length &&
			orderGenerated === 'No creada'
		) {
			generateOrder();
		}

		if (orderId && purchaseGenerated === 'No creada') {
			generatePurchase();
		}

		setTimeout(() => {
			localStorage.setItem('products', JSON.stringify([]));
			dispatch(setItemsAction());
			navigate('/products');
		}, 2000);
	}, [cartItems, navigate, orderGenerated, token, orderId, purchaseGenerated]);

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

export default Success;
