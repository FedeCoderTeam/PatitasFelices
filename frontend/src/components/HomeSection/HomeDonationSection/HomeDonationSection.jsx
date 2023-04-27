import React from 'react';
import './HomeDonationSection.css';
// import dogDonation from './images/dogDonation.png';
// import dogProducts from './images/dogProducts.png';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const HomeDonationSection = () => {
	const { t } = useTranslation()
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
				<h1>{t('home.section.donation.helpUsTo')} <span>{t('home.section.donation.help')}</span></h1>
				<h4>{t('home.section.donation.text1')}</h4>
				<h3>{t('home.section.donation.text2')}</h3>
				<Link to="/donation"><button className='button'>{t('home.section.donation.donate')}</button></Link>
			</div>
		</div>
	);
};

export default HomeDonationSection;