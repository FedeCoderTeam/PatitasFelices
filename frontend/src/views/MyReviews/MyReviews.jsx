import * as React from 'react';
import style from '../MyReviews/MyReviews.module.css'
import { useState } from 'react';
import { ReviewDetail } from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';
import { Player } from '@lottiefiles/react-lottie-player';
import ReviewNotFound from '../../utils/animations/ReviewNotFound.json'

const MyReviews = () => {

    const [showModal, setShowModal] = useState(false);

    const handleOpenReview = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={style.main}>
            <h4>Aún no has hecho ningún comentario</h4>
            <h3>¡No dudes en hacerlo!</h3>
            <Player
				autoplay
				loop
				src={ReviewNotFound}
				className={style.reviewNotFound}
			/>
            <button onClick={handleOpenReview} className={style.buttonComment}>¡Comentar!</button>
                <ReviewDetail
                handleOpenReview={handleOpenReview}
                showModal={showModal}
            />
        </div>
    )
}

export default MyReviews;