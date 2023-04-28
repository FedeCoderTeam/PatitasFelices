import React, { useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Aprob from '../../utils/animations/Success.json';
import {
	setItemsAction,
	updateProduct,
} from '../../_redux/actions/productsAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Success = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const shoppingCart = useSelector(
		(state) => state.productsReducer.shoppingCart,
	);
	const allProducts = useSelector((state) => state.productsReducer.allProducts);

	const cartItems = allProducts
		?.filter((p) => shoppingCart?.items?.some((s) => s.id === p.id))
		.map((p) => ({
			...p,
			quantity: shoppingCart?.items?.find((s) => s.id === p.id).quantity,
		}));

	useEffect(() => {
		if (cartItems?.length) {
			const promises = cartItems.map((item, i) => {
				return dispatch(updateProduct(item));
			});

			Promise.all(promises)
				.then()
				.catch((error) => {
					console.error(error);
				});
		}

		setTimeout(() => {
			localStorage.setItem('products', JSON.stringify([]));
			dispatch(setItemsAction());
			navigate('/products');
		}, 2000);
	}, [cartItems, dispatch]);

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
