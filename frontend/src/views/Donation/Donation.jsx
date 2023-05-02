import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './donation.module.css';
import video from './images/backgroundCSS.mp4';
import { setLinkDePagos } from '../../_redux/actions/mercadopagoAction';
import { useDispatch } from 'react-redux';

const Donation = () => {
	const [donation, setDonation] = useState([
		{
			id: 1,
			name: 'Donacion',
			image: 'zazaazaza.png',
			description: 'Donacion',
			category: 'Donacion',
			quantity: 1,
			price: null,
		},
	]);

	const dispatch = useDispatch();

	const handleDonation = (e) => {
		let donation2 = donation.map((el) => {
			return {
				...el,
				price: e.target.value,
			};
		});
		setDonation(donation2);
	};

	const handleClick = async () => {
		localStorage.setItem('donation', JSON.stringify(donation));

		dispatch(setLinkDePagos(donation));
	};

	return (
		<>
			<div>
				<video
					className={style.video}
					autoplay="true"
					muted="true"
					loop="true"
					src={video}
				></video>
			</div>
			<div className={style.mainContainer}>
				<div className={style.containerDescription}>
					<h2>
						Patitas Felices es una organización sin fines de lucro que se
						financia y mantiene gracias al trabajo incansable de nuestros
						voluntarios, la venta de productos para perros y las donaciones que
						recibimos de la comunidad. Todo tipo de ayuda es de vital
						importancia para que el refugio perdure en el tiempo. Te invitamos a
						que colabores con nuestra causa de la manera en que puedas hacerlo.
					</h2>
					<h3>
						“Casi todas las cosas buenas que suceden en el mundo, nacen de una
						actitud de aprecio a los demás”.
					</h3>
					<h4>Dalai Lama</h4>
				</div>
				<div className={style.containerSections}>
					<div className={style.sectionMercadoPago}>
						{/* <div> */}
						<h3>Ayuda donando con Mercado Pago</h3>
						<div className={style.containerInputButton}>
							<input
								name="donation"
								type="number"
								value={donation[0].price}
								placeholder="Ingresa tu monto aquí"
								onChange={(e) => {
									handleDonation(e);
								}}
							/>
							<div>
								<button onClick={handleClick}>Donar</button>
							</div>
						</div>
						{/* </div> */}
					</div>
					<div className={style.sectionBuyProducts}>
						<div>
							<h3>¿Te interesa contribuír de otra manera?</h3>
							<button>
								<Link target="_blank" to="https://wa.me/5493517039524">
									¡Charlemos!
								</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Donation;
