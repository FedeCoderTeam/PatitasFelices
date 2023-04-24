import React from 'react';
import style from '../Footer/footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<div className={style.mainContainer}>
			<Link to='/home' className={style.logoContainer}>
				<div className={style.happyPaws}>
					<img className={style.logo} src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682299697/Logo_yiz4g6.png" alt=""/>
					<h1>Patitas Felices</h1>
				</div>
			</Link>

			<div className={style.copyright}>
				<p>Copyright 2023. All rights reserved</p>
			</div>

			<div className={style.icons}>
				<i className="fa-brands fa-instagram" id="social-icon"></i>
				<i className="fa-brands fa-facebook-square" id="social-icon"></i>
				<i className="fa-solid fa-envelope"></i>
			</div>
		</div>
	);
}
