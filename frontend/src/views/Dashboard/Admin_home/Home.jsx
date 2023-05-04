import React, { useState, useEffect, useMemo } from 'react';
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
				labels: {
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				}
			},
			{
				name: 'Adoptados',
				data: [adoptedMale, adoptedFemela],
				labels: {
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				}
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
				labels: {
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				},
				colors: ['#fff']
			},
			yaxis: {
				title: {
					text: 'Cantidad',
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				},
				labels: {
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				},
				colors: ['#BF5841', '#F2A477'],
			},
			fill: {
				opacity: 1,
			},
			colors: ['#BF5841', '#F2A477'],
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
		options: {
			xaxis: {
				categories: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
				colors: ['#fff']
			},
			yaxis: {
				title: {
					text: 'Cantidad',
				},
				labels: {
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				}
			},
			fill: {
				opacity: 1,
			},
			colors: ['#daa520', '#F2A477'],
		},
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
			stroke: {
				show: true,
				width: 1,
				colors: ['transparent'],
			},
			xaxis: {
				categories: ['Donaciones', 'Ventas'],
				labels: {
					style: {
						colors: ['#FFFFFF', '#FFFFFF'],
					}
				}
			},
			fill: {
				opacity: 1,
			},
			colors: ['#daa520', '#F2A477'],
		},
		
		series: [
			{
				name: 'series-1',
				data: [totalDonation, totalPurchase],
			},
			
		],
	});

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

        console.log(total);

        const purchases = Object.keys(total);
        const dates = Object.values(total);

        console.log(purchases);
        console.log(dates);

        return { purchases, dates };
    }, [allPurchase]);

	const series = dates
	const [options, setOptions] = useState({
		plotOptions: {
			pie: {
				donut: {
				labels: {
					show: true,
					name: {
					show: true,
					fontSize: '18px',
					color: undefined,
					offsetY: -10
					},
					value: {
					show: true,
					fontSize: '16px',
					color: '#FFFFFF',
					offsetY: 16,
					formatter: function (val) {
						return val
					}
					},
					total: {
					show: true,
					showAlways: false,
					label: 'Total',
					fontSize: '18px',
					color: '#FFFFFF',
					formatter: function (w) {
						return w.globals.seriesTotals.reduce((a, b) => {
						return a + b
						}, 0)
					}
					}
				}
				}
			}
			},
			colors: ['#daa520', '#F2A477'],
		chart: {
		type: 'donut',
		height: '700px',
		},
		labels: purchases,
		responsive: [{
		breakpoint: 480,
		options: {
			legend: {
			position: 'bottom',
			},
			colors: ['#daa520', '#F2A477'],
		},
		}],
	});
	
	return (
		<>
			<div className={style.containerBtnNav}>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHome}>Home Principal</button>
				</Link>
			</div>

			<div className="row">
				<div className={style.mixedChart}>
					<h2 className={style.title1}>Perros por género y estado</h2>
					<Chart
						options={chartData.options}
						series={chartData.series}
						type="bar"
						height={350}
						width={1000}
					/>

					<div className={style.section2}>
						<div className={style.section21}>
							<h2 className={style.title}>Reviews por puntaje</h2>
							<Chart
								options={ratingData.options}
								series={ratingData.series}
								type="bar"
								width="500"
							/>
						</div>

						<div className={style.section22}>
							<h2 className={style.title}>Donaciones y Ventas</h2>	
							<Chart
								options={orderData.options}
								series={orderData.series}
								type="bar"
								width="500"
							/>
						</div>
					</div>

					<div className={style.section3}>
						<h2 className={style.title}>Ingresos por fecha</h2>
						<Chart options={options} series={series} type="donut" height={700} width={500}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
