import React, {useEffect, useRef} from 'react';
import Google from './Google.png';
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { loginUserAction, googleUserAction, setShowOverlayAction } from '../../_redux/actions/authAction';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button, CircularProgress, createTheme, TextField, ThemeProvider} from '@mui/material';
import { useTranslation } from 'react-i18next';



const Login = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
	const isFetching = useSelector(state => state.authReducer.isFetching)
	const navigate = useNavigate();
	const { t } = useTranslation();


	const handleOnGoogle = () => {
		const width = 500;
		const height = 600;
		const top = Math.max((window.screen.availHeight - height) / 2, 0).toString()
		const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
		const googleWindow = window.open('https://patitas-felices.onrender.com/auth/google', 'Google Login', `width=${width}, height=${height}, left=${left}, top=${top}`);

		dispatch(setShowOverlayAction(true))
		const checkWindowClosed = setInterval(() => {
			if(googleWindow.closed) {
				clearInterval(checkWindowClosed)
				dispatch(setShowOverlayAction(false))
			}
		}, 500)

		window.addEventListener('message', async function (event) {
			if(event.origin !== 'https://patitas-felices.onrender.com') return;
			if(event.data.type === 'AUTH_SUCCESS') {
				dispatch(googleUserAction(event.data.payload));
				navigate('/home')
			} else if(event.data.type === 'AUTH_ERROR') {
				await Swal.fire({
					title: event.data.payload.error,
					icon: 'error',
					timer: 10000
				})
			}
		})
	};

	const initialValues = {
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		email: Yup
			.string()
			.email('Enter a valid email')
			.required('Email is required'),
		password: Yup
			.string()
			.min(6, 'Password should be of minimum 6 characters length')
			.max(32, 'Password should be of minimum 32 characters length')
			.matches(/^\S+$/, 'Cannot contain spaces')
			.required('Password is required')
	})

	const handleOnSubmit = (values) => {
		dispatch(
			loginUserAction(
				values.email,
				values.password
			)
		)
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: handleOnSubmit
	})

	const theme = createTheme({
		palette: {
			primary: {
				main: '#163440'
			},
			secondary: {
				main: '#592519'
			},
			action: {
				disabledBackground: '#244e6b',
				disabled: '#fff'
			}
		}
	})

	useEffect(() => {
		if(isAuthenticated) {
			navigate('/home')
		}
	}, [isAuthenticated, navigate])

	return (
		<div className={style.mainContainerLogin}>
			<div className={style.formLogin}>
				<div className={style.title}>
					<h1>{t('login.enter')}</h1>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<div className={style.containerInputsLogin}>
						<div className={style.emailForm}>
							<ThemeProvider theme={theme}>
								<TextField
									disabled={isFetching}
									fullWidth={true}
									name={'email'}
									label={'Email'}
									variant={'filled'}
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</ThemeProvider>
						</div>

						<div className={style.contraseñaForm}>
							<ThemeProvider theme={theme}>
								<TextField
									disabled={isFetching}
									fullWidth={true}
									name={'password'}
									label={'Password'}
									type={'password'}
									variant={'filled'}
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</ThemeProvider>
						</div>
					</div>

					<div className={style.recuperarContraseña} onClick={() => navigate('/request-password-reset')}>
						<p>{t('login.forget')}</p>
					</div>

					<div className={style.containerButtonLogin}>
						<ThemeProvider theme={theme}>
							<Button disabled={isFetching} fullWidth={true} type={'submit'} color={'secondary'} size={'large'} variant="contained" sx={{ '&:hover': { backgroundColor: '#163440' } }} >{t('login.enter')}</Button>
							{isFetching && (<CircularProgress size={24} sx={{
								color: '#D9AD77',
								position: 'absolute',
								top: '50%',
								left: '50%',
								marginTop: '-12px',
								marginLeft: '-12px',
							}}></CircularProgress>)}
						</ThemeProvider>
					</div>
				</form>

				<div className={style.containerGoogleLogin} onClick={handleOnGoogle}>
					<p>
					{t('login.enter2')} <img src={Google} alt="Google" />
					</p>
				</div>

				<div className={style.noCuenta}>
					<p>{t('login.quest1')}</p>
					<Link to="/register">{t('login.signup')}</Link>
				</div>

				<div>
					<Link to="/home" className={style.goHome}>
						<i className="fa-solid fa-house"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
