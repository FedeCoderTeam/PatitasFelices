import React from 'react';
import './HomeDonationSection.css';
// import dogDonation from './images/dogDonation.png';
// import dogProducts from './images/dogProducts.png';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setLinkDonation } from '../../../_redux/actions/productsAction';

const HomeDonationSection = () => {
    // const dispatch = useDispatch();

//     const handleOnBuy = () => {
//         dispatch(setLinkDonation());
//     }

	return (
		<div className="mainContainer-HDonationS">

			<div className="containerBoxes-HDonationS">
				<div className="containerLeft-HDonationS">
					<Link to='/donation'>
						<img src='https://res.cloudinary.com/dreso9ye9/image/upload/v1681880432/133833-money-donation_siju2e.gif' alt="dogDonation" className='donationImage'/>
					</Link>
					<div className="containerBtn-HDonationS">
					</div>
				</div>
			</div>

			<div className='containerRight-HDonationS'>
				<h1>Ayudanos a <span>ayudar</span></h1>
				<h4>Tu donación les proveerá de alimento, atención médica y un hogar temporal</h4>
				<h3>¡Incluso la ayuda más pequeña puede marcar la diferencia en sus vidas!</h3>
				<Link to="/donation"><button className='button'>¡Donar!</button></Link>
			</div>
		</div>
	);
};

export default HomeDonationSection;
