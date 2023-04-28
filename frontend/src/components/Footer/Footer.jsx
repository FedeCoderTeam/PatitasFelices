import React from 'react';
import style from '../Footer/footer.module.css';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export default function Footer() {
	const { t } = useTranslation()

	const handleClick = () =>{
        window.scrollTo(0, 0);
    }

	return (
		<div className={style.mainContainer}>
			<Link to='/home' className={style.logoContainer}>
				<div onClick={handleClick} className={style.happyPaws}>
					<img className={style.logo} src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682299697/Logo_yiz4g6.png" alt=""/>
					<h1>{t('main.title')}</h1>
				</div>
			</Link>

			<div className={style.copyright}>
				<p>{t('footer.copyright')}</p>
			</div>

			<div className={style.icons}>
				<div className={style.instagram}>
					<a href="https://www.instagram.com/milagrosperrunos_/" className={style.instagram} target="_blank"><i className="fa-brands fa-instagram" id="social-icon"></i></a>
				</div>

				<div className={style.facebook}>
					<a href="https://www.facebook.com/profile.php?id=100075872331290" target="_blank" className={style.facebook}><i className="fa-brands fa-facebook-square" id="social-icon"></i></a>
				</div>

				
				<div className={style.whatsapp}>
					<Link to="https://wa.me/5493517039524" className={style.whatsapp} target="_blank"><i class="fa-brands fa-whatsapp"></i></Link>
				</div>

				<div className={style.mail}>
					<a href="https://www.gmail.com" className={style.mail} target="_blank"><i className="fa-solid fa-envelope"></i></a>
				</div>
			</div>
		</div>
	);
}
