import * as React from 'react';
import * as Yup from 'yup';
import style from '../MyReviews/MyReviews.module.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReviewDetail } from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';
import { Player } from '@lottiefiles/react-lottie-player';
import ReviewNotFound from '../../utils/animations/ReviewNotFound.json'
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard';
import * as reviewsAction from '../../_redux/actions/reviewsAction'
import { useFormik } from 'formik';
import useToast from '../../utils/hooks/useToast';
import {
	createTheme,
	Dialog,
	DialogContent,
	ThemeProvider,
} from '@mui/material';
import { brown } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { t } from 'i18next';



const MyReviews = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews);

    const handleOpenReview = () => {
        setShowModal(!showModal)
    }

    const hadleDeleteReview = (id) => {
        /* alert('Seguro quieres borrar tu comentario?') */
        Swal.fire({
            title: 'Seguro quieres eliminar tu comentario?',
            text: "No podras deshacer esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar !',
            cancelButtonText: 'Cancelar !',
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Tu comentario se ha borrado con éxito.',
                'success'
            )
            }
        })
        dispatch(reviewsAction.deleteReview(id))
    }

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
                                // image={e.user?.image}
                            />
                            <div className={style.buttonsContainer}>
                                <button onClick={handleOpenReview} className={style.editButton}><i className="fa-solid fa-pen"></i></button>
                                <button onClick={hadleDeleteReview} className={style.deleteButton}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <EditReview handleOpenReview={handleOpenReview} showModal={showModal} ></EditReview>
        </>
    )
}

export default MyReviews;

//EDITAR COMENTARIO YA CREADO
export function EditReview (props) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.authReducer.token);
    const { success } = useToast();

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
										Modificar Comentario!
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
