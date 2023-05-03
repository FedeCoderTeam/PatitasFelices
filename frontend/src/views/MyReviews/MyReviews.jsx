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
import {
	Dialog,
	DialogContent,
} from '@mui/material';
import * as Yup from 'yup';
import useToast from '../../utils/hooks/useToast';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const MyReviews = () => {

	const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews);

	const [idReview, setIdReview] = useState(null)
	const currentUser = useSelector((state) => state.authReducer.user)


    const handleOpenReview = (event) => {
        setShowModal(!showModal)
		setIdReview(Number(event.currentTarget.value))
    }

    const handleDeleteReview = (id) => {
			Swal.fire({
			title: '¿Seguro quieres eliminar tu comentario?',
			text: "¡No podrás deshacer esta acción!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar',
			cancelButtonText: 'No, cancelar',
			}).then( async (result) => {
			if (result.isConfirmed) {
				dispatch(reviewsAction.deleteReview(id))
				await Swal.fire(
				'¡Eliminado!',
				'Tu comentario se ha eliminado exitosamente.',
				'success',
				)
					
			}
			})
		}
	
	useEffect(() => {
		dispatch(reviewsAction.getReviews())
	}, [dispatch]);

		const currentUserReviews = () => {
			// Filtra la lista allReviews para mostrar solo las revisiones que pertenecen al usuario actualmente conectado
			return allReviews && currentUser && allReviews?.filter((review) => review.userId === currentUser.id);
		}

    return (
        <>
            <div className={style.main}>
				{
					currentUserReviews()?.length === 0 ? (
						<>
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
						</>
					) : (
						<div className={style.cardReviewContainer}>
							{currentUserReviews()?.map((e) => (
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
					)
				}
            </div>
			{idReview && <EditMyReview 
				showModal={showModal}
				handleOpenReview={handleOpenReview}
				idReview={idReview}
				allReviews={allReviews}
			/>}
        </>
    )
}

export default MyReviews;

export function EditMyReview(props) {
	const dispatch = useDispatch();
	const { success, error } = useToast();
	const token = useSelector((state) => state.authReducer.token);
	const { t } = useTranslation();
	
	const find = props.allReviews.find((r) => r.id === props.idReview)
	
	const initialValues = {
		comment: find.comment,
		rating: find.rating,
	};

	const validationSchema = Yup.object().shape({
		comment: Yup.string()
			.max(250, 'El comentario no puede superar los 250 caracteres.*')
			.matches(/^[a-zA-Z\u00C0-\u00FF\s.,!¡?¿]+$/, 'Solo se permiten letras, comas, puntos y signos de exclamación e interrogación.*')
			.required('El comentario es obligatorio.*'),
		rating: Yup.number(),
	});

    const handleSubmit = async ( values ) => {
		if(initialValues.comment === values.comment && 
			initialValues.rating === values.rating){
				error("El comentario no se ha editado")
				return
		} 
		const obj = {
			id: props.idReview,
			token: token,
			comment: values.comment,
			rating: values.rating
		};      
		dispatch(reviewsAction.updateReview(obj))
		success('Tu comentario se ha editado correctamente', {
			duration: 2000
		})
		props.handleOpenReview()
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<>
			<div>
					<Dialog
						sx={{
							'& .MuiDialog-container': {
								'& .MuiPaper-root': {
									borderRadius: '5px',
								},
							},
						}}
						open={props.showModal}
						onClose={props.handleOpenReview}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogContent dividers className={style.dialogContainer}>
							<form onSubmit={formik.handleSubmit}>
								
								<div className={style.ratingSectionDialog}>
									<label htmlFor="rating">{t('HomeReview.rating')}</label>
									<Stack>
										<Rating
											name="rating"
											value={formik.values.rating}
											onChange={formik.handleChange}
											initialRating={formik.values.rating}
										/>
									</Stack>
								</div>

								<div className={style.commentSectionDialog}>
									<label htmlFor="comment">{t('HomeReview.comment')}</label>
									<textarea
										name="comment"
										placeholder="Escribe aquÃ­..."
										value={formik.values.comment}
										onChange={(event) => {
											formik.handleChange(event);
										}}
									/>
									{formik.touched.comment && formik.errors.comment && (
										<div>{formik.errors.comment}</div>
									)}
								</div>

								<div className={style.buttonDialogContainer}>
									<button className={style.buttonDialog} disabled={!formik.isValid} type="submit">
										{t('HomeReview.edit')}
									</button>
								</div>

							</form>
						</DialogContent>
					</Dialog>
			</div>
		</>
	);
}

