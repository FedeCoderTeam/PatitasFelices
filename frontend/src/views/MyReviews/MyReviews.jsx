import * as React from 'react';
import style from '../MyReviews/MyReviews.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReviewDetail } from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';
import { Player } from '@lottiefiles/react-lottie-player';
import ReviewNotFound from '../../utils/animations/ReviewNotFound.json'
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard';
import { t } from 'i18next';

const MyReviews = () => {

    const [showModal, setShowModal] = useState(false);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews);

    const handleOpenReview = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={style.main}>

            <h4 className={style.noReviewsSubtitle}>{t('reviews.comment')}</h4>
            <h3 className={style.noReviewsTitle}>{t('reviews.noDoubt')}</h3>
            <Player
				autoplay
				loop
				src={ReviewNotFound}
				className={style.reviewNotFound}
			/>
            <button onClick={handleOpenReview} className={style.buttonComment}>{t('reviews.send')}</button>
                <ReviewDetail
                handleOpenReview={handleOpenReview}
                showModal={showModal}
            />
            <div className={style.cardReviewContainer}>
                {allReviews?.map((e) => (
                    <div className={style.eachCard}>
                        <ReviewCard
                            data-aos="fade-right" data-aos-duration="1000"
                            id={e.id}
                            rating={e.rating}
                            comment={e.comment}
                            name={e.user?.name}
                            last={e.user?.last}
                            // image={e.user?.image}
                        />
                        <div className={style.buttonsContainer}>
                            <button className={style.editButton}><i class="fa-solid fa-pen"></i></button>
                            <button className={style.deleteButton}><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyReviews;