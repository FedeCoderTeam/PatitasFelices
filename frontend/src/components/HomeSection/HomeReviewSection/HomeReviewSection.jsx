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
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const HomeReviewSection = () => {
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);
	const allReviews = useSelector((state) => state.reviewsReducer.reviews);
	const [currentIndex, setCurrentIndex] = useState(0);
	const user = useSelector((state) => state.authReducer.user)
	const navigate = useNavigate();
	

	useEffect(() => {
		// Cambiar el índice de la tarjeta que se muestra cada 10 segundos
		const timer = setTimeout(() => {
			setCurrentIndex((currentIndex + 1) % allReviews.length);
		}, 6000);
		
		return () => clearTimeout(timer);
	}, [currentIndex, allReviews.length]);

	const handleOpenReview = () => {
		user !== null 
		? setShowModal(!showModal) 
		: Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Necesitas iniciar sesión para poder dejar tu comentario',
			confirmButtonText: "Iniciar Sesión!",
			confirmButtonColor: '#592519',
			showConfirmButton: true,
			showCloseButton: true,
		}).then(async (result) => {
			if(result.isConfirmed) {
				navigate('/login')
			}
		})
	};

	const handleClickPrev = () => {
		const container = document.querySelector(`.${style.productCardContainer}`);
		container.classList.add(style.moveRight);

		setTimeout(() => {
			setCurrentIndex(
				currentIndex > 0 ? currentIndex - 1 : allReviews.length - 1
			);
		  container.classList.remove(style.moveRight);
		}, 750);
	  };

	const handleClickNext = () =>{
		const container = document.querySelector(`.${style.productCardContainer}`);
		container.classList.add(style.moveLeft);
		  
		setTimeout(() => {
			setCurrentIndex((currentIndex + 1) % allReviews.length)
			container.classList.remove(style.moveLeft);
		}, 750);
	}

	return (
		<>
			<div>
				<div className={style.mainContainer}>
					<div className={style.containerBoxes}>
						<div className={style.containerLeft}>
							<Link to="/myreviews">
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
							<div className={style.arrows} onClick={handleClickPrev}>
								<i className="fa-solid fa-chevron-left" ></i>
							</div>
							<div className={style.productCardContainer}>
								<ReviewCard
									data-aos="fade-right" data-aos-duration="1000"
									id={allReviews[currentIndex]?.id}
									rating={allReviews[currentIndex]?.rating}
									comment={allReviews[currentIndex]?.comment}
									name={allReviews[currentIndex]?.user?.name}
									last={allReviews[currentIndex]?.user?.last}
									image={allReviews[currentIndex]?.user?.image}
								/>
							</div>
							<div className={style.arrows} onClick={handleClickNext}>
								<i className="fa-solid fa-chevron-right"></i>
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
	const { t } = useTranslation();


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
			.max(250, 'El comentario no puede superar los 250 caracteres.*')
			.matches(/^[a-zA-Z\u00C0-\u00FF\s.,!¡?¿]+$/, 'Solo se permiten letras, comas, puntos y signos de exclamación e interrogación.*')
			.required('El comentario es obligatorio.*'),
		rating: Yup.number(),
	});

    const handleSubmit = ( values ) => {
        const obj = {
            token: token,
            comment: values.comment,
            rating: values.rating
        };      
        dispatch(reviewsAction.postReviews(obj)) 
        success('Tu comentario se ha enviado correctamente', {
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
										placeholder="Escribe aquí..."
										value={formik.values.comment}
										onChange={(event) => {
											formik.handleChange(event);
										}}
									/>
									{formik.touched.comment && formik.errors.comment && (
										<div className={style.errorMessage}>{formik.errors.comment}</div>
									)}
								</div>

								<div className={style.buttonDialogContainer}>
									<button className={style.buttonDialog} disabled={!formik.isValid} type="submit">
										{t('HomeReview.send')}
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
