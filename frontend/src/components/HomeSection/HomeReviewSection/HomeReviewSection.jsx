import React from 'react';
import style from './HomeReviewSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	createTheme,
	Dialog,
	DialogContent,
	ThemeProvider,
} from '@mui/material';
import { brown } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReviewCard from '../../Cards/ReviewCard/ReviewCard';
import useToast from '../../../utils/hooks/useToast';
import * as reviewsAction from '../../../_redux/actions/reviewsAction';
import { useFormik } from 'formik';
import { Player } from '@lottiefiles/react-lottie-player';
import ReviewGuy from '../../../utils/animations/ReviewGuy.json'


const HomeReviewSection = () => {
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);
	const allReviews = useSelector((state) => state.reviewsReducer.reviews);

	const [currentIndex, setCurrentIndex] = useState(0);
	

	useEffect(() => {
		// Cambiar el índice de la tarjeta que se muestra cada 10 segundos
		const timer = setTimeout(() => {
			setCurrentIndex((currentIndex + 1) % allReviews.length);
		}, 6000);

		return () => clearTimeout(timer);
	}, [currentIndex, allReviews.length]);

	const handleOpenReview = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div>
				<div className={style.mainContainer}>
					<div className={style.containerBoxes}>
						<div className={style.containerLeft}>
							<Link to="/donation">
							<Player
									autoplay
									loop
									src={ReviewGuy}
									className={style.reviewImage}
								/>
							</Link>
							<div className="containerBtn-HDonationS"></div>
						</div>
					</div>

					<div className={style.containerRight}>
						<h1>
							{t('home.section.review.yourOpinionMattersToUs')}{' '}
							<span>{t('home.section.review.shareIt')}</span>
						</h1>
						<div className={style.carousel}>
							<div className={style.arrows}>
								<i className="fa-solid fa-chevron-left" 
								onClick={() =>
									setCurrentIndex(
										currentIndex > 0 ? currentIndex - 1 : allReviews.length - 1
									)
								}></i>
							</div>
							<ReviewCard
								data-aos="fade-right" data-aos-duration="1000"
								id={allReviews[currentIndex]?.id}
								rating={allReviews[currentIndex]?.rating}
								comment={allReviews[currentIndex]?.comment}
								name={allReviews[currentIndex]?.user?.name}
								last={allReviews[currentIndex]?.user?.last}
								image={allReviews[currentIndex]?.user?.image}
							/>
							<div className={style.arrows}>
								<i className="fa-solid fa-chevron-right"
								onClick={() =>
									setCurrentIndex((currentIndex + 1) % allReviews.length)
								}></i>
							</div>
						</div>
						<button onClick={handleOpenReview} className="button">
							{t('home.section.review.comment')}
						</button>
					</div>
				</div>
			</div>
			<ReviewDetail handleOpenReview={handleOpenReview} showModal={showModal} />
		</>
	);
};

export default HomeReviewSection;

export function ReviewDetail(props) {
	const dispatch = useDispatch();
	const { success } = useToast();
	const token = useSelector((state) => state.authReducer.token);

	const innerTheme = createTheme({
		palette: {
			primary: {
				main: brown[500],
			},
			background: {
				default: '#163440',
				paper: '#163440',
			},
			text: {
				...{
					primary: '#fff',
					secondary: '#fff',
				},
			},
		},
	});

	const initialValues = {
		comment: '',
		rating: 1,
	};

	const validationSchema = Yup.object().shape({
		comment: Yup.string()
			.max(130, 'El comentario no puede superar los 130 caracteres')
			.required('El comentario es obligatorio'),
		rating: Yup.number(),
	});

    const handleSubmit = ( values ) => {
        const obj = {
            token: token,
            comment: values.comment,
            rating: values.rating
        };      
        dispatch(reviewsAction.postReviews(obj)) 
        success('Tu comentario se ha enviada correctamente', {
            duration: 2000
		});
		props.handleOpenReview();
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<>
			<div>
				<ThemeProvider theme={innerTheme}>
					<Dialog
						sx={{
							'& .MuiDialog-container': {
								'& .MuiPaper-root': {
									borderRadius: '10px',
								},
							},
						}}
						open={props.showModal}
						onClose={props.handleOpenReview}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogContent dividers>
							<form onSubmit={formik.handleSubmit}>
								<div>
									<label htmlFor="comment">Comentario</label>
									<textarea
										name="comment"
										placeholder="Deja tu comentario..."
										value={formik.values.comment}
										onChange={(event) => {
											formik.handleChange(event);
										}}
									/>
									{formik.touched.comment && formik.errors.comment && (
										<div>{formik.errors.comment}</div>
									)}
								</div>
								<div>
									<label htmlFor="rating">Puntuación</label>
									<Stack>
										<Rating
											name="rating"
											value={formik.values.rating}
											onChange={formik.handleChange}
											initialRating={formik.values.rating}
										/>
									</Stack>
								</div>
								<div>
									<button disabled={!formik.isValid} type="submit">
										Enviar Reseña!
									</button>
								</div>
							</form>
						</DialogContent>
					</Dialog>
				</ThemeProvider>
			</div>
		</>
	);
}
