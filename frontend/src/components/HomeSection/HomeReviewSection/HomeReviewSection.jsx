import React from 'react';
import style from './HomeReviewSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
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

const HomeReviewSection = () => {
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);
	// const allReviews = useSelector((state) => state.reviewsReducer.reviews);

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
								<img
									src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682436574/24491-review-animation_pzthnp.gif"
									alt="dogDonation"
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
							<i className="fa-solid fa-chevron-left"></i>
							<ReviewCard />
							<i className="fa-solid fa-chevron-right"></i>
						</div>
						{/* FALTA HACER LOGICA DE QUE SI ESTA LOGEADO,
                    PUEDA COMENTAR SINO QUE SE REGISTRE PREVIO A COMENTAR */}
						<button onClick={handleOpenReview} className="button">
							{t('home.section.review.comment')}
						</button>
					</div>
				</div>

				<div className={style.containerRight}>
					<h1>
						{t('home.section.review.yourOpinionMattersToUs')}{' '}
						<span>{t('home.section.review.shareIt')}</span>
					</h1>
					<div className={style.carousel}>
						<i className="fa-solid fa-chevron-left"></i>
						{/* {allReviews?.map((e) => {
                        return (
                            <ReviewCard 
                                id = {e.id}
                                rating = {e.rating}
                                comment = {e.comment}
                                name = {e.user?.name}
                                last = {e.user?.last}
                                image = {e.user?.image}
                            />
                        )
                    })} */}
						<ReviewCard />
						<i className="fa-solid fa-chevron-right"></i>
					</div>
					{/* FALTA HACER LOGICA DE QUE SI ESTA LOGEADO,
                    PUEDA COMENTAR SINO QUE SE REGISTRE PREVIO A COMENTAR */}
					<button onClick={handleOpenReview} className="button">
						{t('home.section.review.comment')}
					</button>
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
        }        
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
