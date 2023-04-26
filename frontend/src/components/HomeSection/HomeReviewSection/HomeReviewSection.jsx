import React from 'react';
import style from './HomeReviewSection.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {createTheme, Dialog, DialogContent, ThemeProvider,} from '@mui/material';
import { brown } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const HomeReviewSection = () => {

    const [showModal, setShowModal] = useState(false);

    const handleOpenReview = () => {
        setShowModal(!showModal)
    }
	return (
        <>
		<div className={style.mainContainer}>
			<div className={style.containerBoxes}>
				<div className={style.containerLeft}>
					<Link to='/donation'>
						<img src='https://res.cloudinary.com/dreso9ye9/image/upload/v1682436574/24491-review-animation_pzthnp.gif' alt="dogDonation" className={style.reviewImage}/>
					</Link>
					<div className="containerBtn-HDonationS">
					</div>
				</div>
			</div>

			<div className={style.containerRight}>
				<h1>Tu opinión nos importa, <span>compártela</span></h1>
                <div className={style.carousel}>
                    <i class="fa-solid fa-chevron-left"></i>
                    <div className={style.reviewCard}>
                        <div className={style.userImg}>
                            <img src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682440997/Messi_chiquito_nzv8n5.jpg" alt="" />
                        </div>

                        <div className={style.reviewInfo}>
                            <h2>Messi Chiquito</h2>
                            <div className={style.stars}>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>

                            <div className={style.comentary}>
                                <h4>Es admirable la calidad humana y dedicación de todo el equipo de Patitas Felices, sin duda los perritos están muy agradecidos con ellos. Hola cocu, te mando un saludo a vo y al momo. Fulvo.</h4>
                            </div>
                            
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                    {
                    /* FALTA HACER LOGICA DE QUE SI ESTA LOGEADO,
                    PUEDA COMENTAR SINO QUE SE REGISTRE PREVIO A COMENTAR */
                    }
                    <button onClick={handleOpenReview} className='button'>¡Comentar!</button>
			</div>
		</div>
        <ReviewDetail 
        handleOpenReview={handleOpenReview}
        showModal={showModal}
        />
    </>
	);
};

export default HomeReviewSection;


export function ReviewDetail (props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        rating: '',
    }
    
    const validationSchema = Yup.object().shape({
        comment: Yup.string()
        .max(300, 'El comentario no puede superar los 300 caracteres')
        .required('El comentario es obligatorio'),
        rating: Yup.number()
        .required('La puntuación es obligatoria')
    })
    
    const handleSubmit = ( { resetForm } ) => {
        resetForm();
    }

    const handleClick = () => {
        dispatch();
        navigate('/home');
    };
    return(
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            handleSubmit={handleSubmit}
                            >
                            {({ errors }) => (
                            <Form>
                                <div>
                                    <label htmlFor="comment">Comentario</label>
                                    <Field 
                                        name='comment' 
                                        as='textarea' 
                                        placeholder='Deja tu comentario...'
                                        />
                                    <ErrorMessage name="comment" >
                                        {(msg) => <div className="errorMessage">{msg}</div> }
                                    </ErrorMessage>
                                </div>
                                <div>
                                    <label htmlFor="rating">Puntuación</label>
        
                                    <Stack spacing={1}>
                                        <Rating name="size-small" defaultValue={2} size="small" />
                                        <Rating name="size-medium" defaultValue={2} />
                                        <Rating name="size-large" defaultValue={2} size="large" />
                                    </Stack>
                                    
                                    <ErrorMessage name="rating" >
                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div>
                                    <button 
                                    onClick={handleClick}
                                    type="submit" 
                                    disabled={Object.keys(errors).length > 0}>Enviar Reseña!</button>
                                </div>
                            </Form>
                            )}
                        </Formik>
                        </DialogContent>
                    </Dialog>

                </ThemeProvider>
            </div>
        </>
    )
}

