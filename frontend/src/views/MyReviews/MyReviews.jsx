import * as React from 'react';
import style from '../MyReviews/MyReviews.module.css'
import { useState } from 'react';
import { ReviewDetail } from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';

const MyReviews = () => {

    const [showModal, setShowModal] = useState(false);

    const handleOpenReview = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={style.main}>
            <h4>Aún no has hecho ningún comentario</h4>
            <h3>¡No dudes en hacerlo!</h3>
            <img src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682482076/84807-not-found-alt_ejlqme.gif" alt="" />
            <button onClick={handleOpenReview} className={style.buttonComment}>¡Comentar!</button>
                <ReviewDetail
                handleOpenReview={handleOpenReview}
                showModal={showModal}
            />
        </div>
    )
}

export default MyReviews;