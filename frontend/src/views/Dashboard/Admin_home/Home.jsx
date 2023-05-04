import React, { useState, useEffect } from 'react';
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

	//INFO PERROS CANTIDAD DE MACHOS Y HEMBRAS; Y ADOPTADOS

	let maleCount = 0;
	let femaleCount = 0;
	let adoptedMale = 0;
	let adoptedFemela = 0;

	for (let i = 0; i < allDogs.length; i++) {
		if (allDogs[i].adopted === false && allDogs[i].isDisabled === false) {
			if (allDogs[i].gender === 'Macho') maleCount += 1;
			else femaleCount += 1;
		}
	}

	for (let i = 0; i < allDogs.length; i++) {
		if (allDogs[i].adopted === true) {
			if (allDogs[i].gender === 'Macho') adoptedMale += 1;
			else adoptedFemela += 1;
		}
	}

	const [chartData, setChartData] = useState({
		series: [
			{
				name: 'Total',
				data: [maleCount, femaleCount],
			},
			{
				name: 'Adoptados',
				data: [adoptedMale, adoptedFemela],
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
					text: 'Cantidad',
				},
			},
			fill: {
				opacity: 1,
			},
		},
	});

	//INFO REVIEWS

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

	const [ratingData, setRatingData] = useState({
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
	});

	//INFO RECAUDACIONES

	let totalDonation = 0;
	let totalPurchase = 0;

	for (let i = 0; i < allOrders?.length; i++) {
		if (allOrders[i].source === 'Compra') {
			totalPurchase = totalPurchase + Number(allOrders[i].total);
		} else {
			totalDonation = totalDonation + Number(allOrders[i].total);
		}
	}

	const [orderData, setOrderData] = useState({
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
	});

	//PURCHASES

	const total = allPurchase.reduce((acc, purchase) => {
		const purchaseDate = new Date(purchase.createdAt).toLocaleDateString();
		const subtotal = Number(purchase.product.price) * purchase.quantity;
		acc[purchaseDate] = acc[purchaseDate]
			? acc[purchaseDate] + subtotal
			: subtotal;
		return acc;
	}, {});

	let purchases = Object.keys(total);
	let dates = Object.values(total);

	const [purchaseData, setPurchaseData] = useState({
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
	});

	const [options, setOptions] = useState({
		chart: {
		type: 'polarArea',
		},
		stroke: {
		colors: ['#fff'],
		},
		fill: {
		opacity: 0.8,
		},
		responsive: [
		{
			breakpoint: 480,
			options: {
			chart: {
				width: 200,
			},
			legend: {
				position: 'bottom',
			},
			},
		},
		],
	});
	
	const [series, setSeries] = useState([...dates]);
	console.log(purchases);
	

	return (
		<>
			<div className={style.containerBtnNav}>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHome}>Home Principal</button>
				</Link>
			</div>

			<div className="row">
				<div className={style.mixedChart}>
					<Chart
						options={chartData.options}
						series={chartData.series}
						type="bar"
						height={350}
						width={1000}
					/>

					<div className={style.section2}>
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
					</div>

					<div className={style.section3}>
						<Chart
							options={purchaseData.options}
							series={purchaseData.series}
							type="bar"
							width="500"
						/>
						<Chart
							options={options}
							series={series}
							type="polarArea"
							width="500"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
