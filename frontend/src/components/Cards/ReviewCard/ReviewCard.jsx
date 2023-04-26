import style from './ReviewCard.module.css';
import * as React from 'react';

const ReviewCard = ({ rating, comment, userId, id }) => {
	return (
		<>
			<div className={style.reviewCard}>
                <div className={style.userImg}>
                    <img src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682440997/Messi_chiquito_nzv8n5.jpg" alt="" />
                </div>

                <div className={style.reviewInfo}>
                    <h2>Messi Chiquito</h2>
                    <div className={style.stars}>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </div>

                    <div className={style.comentary}>
                        <h4>Es admirable la calidad humana y dedicación de todo el equipo de Patitas Felices, sin duda los perritos están muy agradecidos con ellos. Hola cocu, te mando un saludo a vo y al momo. Fulvo.</h4>
                    </div>
                            
                </div>
            </div>
		</>
	);
};

export default ReviewCard;