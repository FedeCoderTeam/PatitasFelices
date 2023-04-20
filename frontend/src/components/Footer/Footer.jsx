import React from 'react';
import style from '../Footer/footer.module.css';

export default function Footer() {
	return (
		<div className={style.mainContainer}>
			<div className={style.happyPaws}>
				<h1>Happy Paws</h1>
			</div>

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
