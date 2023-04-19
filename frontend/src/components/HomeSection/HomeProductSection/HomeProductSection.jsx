import React from 'react';
import './homeProductSection.css';
import { Link } from 'react-router-dom';

const HomeProductSection = () => {
	return (
		<div className="mainContainer-HProductS">

			<div className='containerLeft-HProductS'>
				<h1>Mira nuestros <span>productos</span></h1>
				<h4>¿Sabías que puedes ayudar a los perritos sin hogar mientras compras artículos para tu mascota?</h4>
				<h3>Cada compra que realizas ayuda a los perritos sin hogar en nuestro refugio.</h3>
				<Link to="/products"><button className='button'>¡Comprar!</button></Link>
			</div>

			<div className="containerBoxes-HProductS">
				<div className="containerRight-HProductS">
					<Link to='/products'>
						<img src='https://res.cloudinary.com/dreso9ye9/image/upload/v1681883549/pet-food_ppr8jo.png' alt="dogProduct" className='productImage'/>
					</Link>
				</div>
			</div>

		</div>
	);
};

export default HomeProductSection;

				