import React from 'react';
import './homeProductSection.css';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import { Player } from '@lottiefiles/react-lottie-player';
import GirlShopping from '../../../utils/animations/GirlShoppingHomeSection.json'

const HomeProductSection = () => {
	const { t } = useTranslation()

	const handleClick = () =>{
        window.scrollTo(0, 0);
    }

	return (
		<div className="mainContainer-HProductS">

			<div className='containerLeft-HProductS'>
				<h1>{t('home.section.product.checkOutOur')} <span>{t('home.section.product.products')}</span></h1>
				<h4>{t('home.section.product.text1')}</h4>
				<h3>{t('home.section.product.text2')}</h3>
				<Link onClick={handleClick} to="/products"><button className='button'>{t('home.section.product.purchaseNow')}</button></Link>
			</div>

			<div className="containerBoxes-HProductS">
				<div className="containerRight-HProductS">
					<Link onClick={handleClick} to='/products'>
						<Player
								autoplay
								loop
								src={GirlShopping}
								className='productImage'
							/>
					</Link>
				</div>
			</div>

		</div>
	);
};

export default HomeProductSection;

				