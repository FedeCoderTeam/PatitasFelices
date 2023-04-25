import React from 'react';
import style from './HomeReviewSection.module.css';
import { Link } from 'react-router-dom';

const HomeReviewSection = ({ image, name, age, gender }) => {
	return (
		<div className={style.mainContainer}>

			<div className={style.containerBoxes}>
				<div className={style.containerLeft}>
					<Link to='/donation'>
						<img src='https://res.cloudinary.com/dreso9ye9/image/upload/v1682436574/24491-review-animation_pzthnp.gif' alt="dogDonation" className={style.reviewImage}/>
					</Link>
					<div className="containerBtn-HDonationS">
					</div>
				</div>
			</div>

			<div className={style.containerRight}>
				<h1>Tu opinión nos importa, <span>compártela</span></h1>
                <div className={style.carousel}>
                    <i class="fa-solid fa-chevron-left"></i>
                    <div className={style.reviewCard}>
                        <div className={style.userImg}>
                            <img src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682440997/Messi_chiquito_nzv8n5.jpg" alt="" />
                        </div>

                        <div className={style.reviewInfo}>
                            <h2>Messi Chiquito</h2>
                            <div className={style.stars}>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>

                            <div className={style.comentary}>
                                <h4>Es admirable la calidad humana y dedicación de todo el equipo de Patitas Felices, sin duda los perritos están muy agradecidos con ellos. Hola cocu, te mando un saludo a vo y al momo. Fulvo.</h4>
                            </div>
                            
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>

				<Link to="/donation"><button className='button'>¡Comentar!</button></Link>
			</div>

		</div>
	);
};

export default HomeReviewSection;
