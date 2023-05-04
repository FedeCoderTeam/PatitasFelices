import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import style from './homeDash.module.css';
import * as actionDogs from '../../../_redux/actions/dogsAction';
import * as actionReviews from '../../../_redux/actions/reviewsAction';
import * as actionMp from '../../../_redux/actions/mercadopagoAction';

const Home = () => {
	const dispatch = useDispatch();

	const allDogs = useSelector((state) => state.dogsReducer.allDogs);
	const allReviews = useSelector((state) => state.reviewsReducer.reviews);
	const allOrders = useSelector((state) => state.mercadopagoReducer.orders);
	const allPurchase = useSelector(
		(state) => state.mercadopagoReducer.purchases,
	);

	useEffect(() => {
		dispatch(actionDogs.getDogs());
		dispatch(actionReviews.getReviews());
		dispatch(actionMp.getPurchases());
		dispatch(actionMp.getOrders());
	}, [dispatch]);

	//INFO PERROS CANTIDAD DE MACHOS, HEMBRAS Y ADOPTADOS

	const [maleCount, femaleCount, adoptedMale, adoptedFemale] = useMemo(() => {
		let maleCount = 0;
		let femaleCount = 0;
		let adoptedMale = 0;
		let adoptedFemale = 0;

		for (let i = 0; i < allDogs.length; i++) {
			const { adopted, gender } = allDogs[i];

			if (!adopted) {
				if (gender === 'Macho') {
					maleCount++;
				} else {
					femaleCount++;
				}
			} else {
				if (gender === 'Macho') {
					adoptedMale++;
				} else {
					adoptedFemale++;
				}
			}
		}

		return [maleCount, femaleCount, adoptedMale, adoptedFemale];
	}, [allDogs]);

	const chartData = {
		series: [
			{
				name: 'Cantidad',
				data: [maleCount, femaleCount],
			},
			{
				name: 'Adoptados',
				data: [adoptedMale, adoptedFemale],
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					endingShape: 'rounded',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories: ['Macho', 'Hembra'],
			},
			yaxis: {
				title: {
					text: 'Marcos puto',
				},
			},
			fill: {
				opacity: 1,
			},
		},
	};

	//INFO REVIEWS

	const [uno, dos, tres, cuatro, cinco] = useMemo(() => {
		let uno = 0;
		let dos = 0;
		let tres = 0;
		let cuatro = 0;
		let cinco = 0;

		for (let i = 0; i < allReviews?.length; i++) {
			switch (allReviews[i].rating) {
				case 1:
					uno += 1;
					break;

				case 2:
					dos += 1;
					break;
				case 3:
					tres += 1;
					break;
				case 4:
					cuatro += 1;
					break;
				case 5:
					cinco += 1;
					break;
			}
		}

		return [uno, dos, tres, cuatro, cinco];
	}, [allReviews]);

	const ratingData = {
		options: {
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: [1, 2, 3, 4, 5],
			},
		},
		series: [
			{
				name: 'series-1',
				data: [uno, dos, tres, cuatro, cinco],
			},
		],
	};

	//INFO RECAUDACIONES

	const [totalDonation, totalPurchase] = useMemo(() => {
		let totalDonation = 0;
		let totalPurchase = 0;

		for (let i = 0; i < allOrders?.length; i++) {
			if (allOrders[i].source === 'Compra') {
				totalPurchase = totalPurchase + Number(allOrders[i].total);
			} else {
				totalDonation = totalDonation + Number(allOrders[i].total);
			}
		}

		return [totalDonation, totalPurchase];
	}, [allOrders]);

	const orderData = {
		options: {
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: ['Donaciones', 'Ventas'],
			},
		},
		series: [
			{
				name: 'series-1',
				data: [totalDonation, totalPurchase],
			},
		],
	};

	//PURCHASES

	const { purchases, dates } = useMemo(() => {
		const total = allPurchase.reduce((acc, purchase) => {
			const purchaseDate = new Date(purchase.createdAt).toLocaleDateString();
			const subtotal = Number(purchase.product.price) * purchase.quantity;
			acc[purchaseDate] = acc[purchaseDate]
				? acc[purchaseDate] + subtotal
				: subtotal;
			return acc;
		}, {});

		const purchases = Object.keys(total);
		const dates = Object.values(total);

		return { purchases, dates };
	}, [allPurchase]);

	const purchaseData = {
		options: {
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: [...purchases],
			},
		},
		series: [
			{
				name: 'series-1',
				data: [...dates],
			},
		],
	};

	return (
		<>
			<div className={style.containerBtnNav}>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHome}>Home Principal</button>
				</Link>
			</div>

			<div className="row">
				<div className="mixed-chart">
					<Chart
						options={chartData.options}
						series={chartData.series}
						type="bar"
						height={350}
					/>

					<Chart
						options={ratingData.options}
						series={ratingData.series}
						type="bar"
						width="500"
					/>
					<Chart
						options={orderData.options}
						series={orderData.series}
						type="bar"
						width="500"
					/>
					<Chart
						options={purchaseData.options}
						series={purchaseData.series}
						type="bar"
						width="500"
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
