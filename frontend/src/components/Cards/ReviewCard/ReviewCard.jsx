import style from './ReviewCard.module.css';
import * as React from 'react';

const ReviewCard = ({ id, rating, comment, name, last, image }) => {
	return (
		<>
			<div className={style.reviewCard} key={id}>
                <div className={style.userImg}>
                    <img src={image} alt="" />
                </div>

                <div className={style.reviewInfo}>
                    <h2>{name} {last}</h2>
                    <div className={style.stars}>
                        {
                            rating === 4 ? (
                                <>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                </>
                            ) : (rating === 3 ? (
                                <>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                </>
                            ) : (rating === 2 ? (
                                <>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                </>
                            ) : (rating === 1 ? (
                                <>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                    <i className="fa-sharp fa-regular fa-star"></i>
                                </>
                            ) : (
                                <>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </>
                            ))))
                        }
                    </div>

                    <div className={style.comentary}>
                        <h4>{comment}</h4>
                    </div>
                            
                </div>
            </div>
		</>
	);
};

export default ReviewCard;