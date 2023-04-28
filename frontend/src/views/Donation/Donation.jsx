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
			description: 'donacion',
			category: 'donacion',
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
					<h3>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
						impedit minima nemo natus obcaecati. Totam ducimus, non labore,
						placeat harum fuga eum ullam laboriosam, obcaecati similique cumque!
						Animi atque ipsa consequuntur rerum incidunt assumenda ad mollitia
						facere officia iusto, aliquam, maiores, sed sint tenetur illo quidem
						voluptatem asperiores! Tempora, saepe esse. Excepturi eos alias
						laudantium, vitae, aliquam hic delectus quidem soluta dolorem est
						atque obcaecati? Eos nemo dolore debitis! Quo officia repudiandae
						beatae assumenda, similique natus accusantium distinctio a quia
						molestiae, sit dignissimos animi obcaecati doloremque consequuntur
						nesciunt? Alias magnam accusantium itaque aliquid id quod a quae
						atque? Vel, earum.
					</h3>
				</div>
				<div className={style.containerSections}>
					<div className={style.sectionMercadoPago}>
						<div>
							<h3>Ayuda donando con Mercado Pago</h3>
							<input
								name="donation"
								type="number"
								value={donation[0].price}
								placeholder="Ingresa tu monto aquí"
								onChange={(e) => {
									handleDonation(e);
								}}
							/>
							<button onClick={handleClick}>Donar</button>
						</div>
					</div>
					<div className={style.sectionBuyProducts}>
						<div>
							<h3>¿Te interesa contribuír de otra manera?</h3>
							<button>
								<Link target="_blank" to="https://wa.me/5493517039524">
									¡Comunícate con nosotros!
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
