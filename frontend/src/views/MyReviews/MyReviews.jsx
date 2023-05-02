import * as React from 'react';
import style from '../MyReviews/MyReviews.module.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReviewDetail } from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';
import { Player } from '@lottiefiles/react-lottie-player';
import ReviewNotFound from '../../utils/animations/ReviewNotFound.json'
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard';
import * as reviewsAction from '../../_redux/actions/reviewsAction'
import Swal from 'sweetalert2';
import { t } from 'i18next';


const MyReviews = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews);

    const handleOpenReview = () => {
        setShowModal(!showModal)
    }

    const handleDeleteReview = (id) => {
			Swal.fire({
			title: 'Seguro quieres eliminar tu comentario?',
			text: "No podras deshacer esta accion!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar !',
			cancelButtonText: 'No, cancelar',
			}).then((result) => {
			if (result.isConfirmed) {
				dispatch(reviewsAction.deleteReview(id))
				Swal.fire(
				'Eliminado!',
				'Tu comentario se ha borrado con éxito.',
				'success',
				).then(() => {
					window.location.reload();
				});
			}
			})
		}

	useEffect(() => {
		dispatch(reviewsAction.deleteReview())
	}, [dispatch]);

    return (
        <>
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
                                /* image={e.user?.image} */
								handleDeleteReview={() => handleDeleteReview(e.id)}
								handleOpenReview={handleOpenReview}
                            />
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyReviews;

