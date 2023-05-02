import React, {useEffect, useState} from 'react';
import Google from './Google.png';
import {Link, useNavigate} from 'react-router-dom';
import style from './Register.module.css';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup'
import { registerUserAction, googleUserAction, setShowOverlayAction } from '../../_redux/actions/authAction';
import Swal from 'sweetalert2';
import {useFormik} from 'formik';
import {Button, CircularProgress, createTheme, TextField, ThemeProvider} from '@mui/material';
import { useTranslation } from 'react-i18next';


const Register = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const isFetching = useSelector(state => state.authReducer.isFetching)
	const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
	const navigate = useNavigate()

	const handleOnGoogle = () => {
		const width = 500;
		const height = 600;
		const top = Math.max((window.screen.availHeight - height) / 2, 0).toString()
		const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
		const googleWindow = window.open('http://localhost:3001/auth/google', 'Google Login', `width=${width}, height=${height}, left=${left}, top=${top}`);

		dispatch(setShowOverlayAction(true))
		const checkWindowClosed = setInterval(() => {
			if(googleWindow.closed) {
				clearInterval(checkWindowClosed)
				dispatch(setShowOverlayAction(false))
			}
		}, 500)

		window.addEventListener('message', async function (event) {
			if(event.origin !== 'http://localhost:3001') return;
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
		name: '',
		last: '',
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		name: Yup
			.string()
			.min(2, 'Your name must have a minimum of 2 characters')
			.max(32, 'Your name must have a maximum of 32 characters')
			.matches(/^[a-zA-Z]+( [a-zA-Z]+){0,3}$/, 'Your name is wrong')
			.required('Name is required'),
		last: Yup
			.string()
			.min(2, 'Your name must have a minimum of 2 characters')
			.max(32, 'Your name must have a maximum of 32 characters')
			.matches(/^[a-zA-Z]+( [a-zA-Z]+){0,3}$/, 'Your last is wrong')
			.required('Name is required'),
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

	const [isSuccess, setIsSuccess] = useState(false)
	const handleOnSubmit = (values) => {
		dispatch(
			registerUserAction(
				values.name,
				values.last,
				values.email,
				values.password,
				setIsSuccess
			),
		).then(() => {
			if(isSuccess) {
				navigate('/home')
			}
		})
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
		<div className={style.mainContainerRegister} data-aos="fade-left">
			<div className={style.formRegister}>
				<div className={style.title}>
					<h1>{t('nav.links.signUp')}</h1>
				</div>

				<div className={style.containerInputsRegister}>
					<form onSubmit={formik.handleSubmit}>
						<div className={style.personalInfo}>
							<div className={style.nombre}>
								<ThemeProvider theme={theme}>
									<TextField
										disabled={isFetching}
										name={'name'}
										label={'Name'}
										variant={'filled'}
										value={formik.values.name}
										onChange={formik.handleChange}
										error={formik.touched.name && Boolean(formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
									/>
								</ThemeProvider>
							</div>

							<div className={style.apellido}>
								<ThemeProvider theme={theme}>
									<TextField
										disabled={isFetching}
										name={'last'}
										label={'Last'}
										variant={'filled'}
										value={formik.values.last}
										onChange={formik.handleChange}
										error={formik.touched.last && Boolean(formik.errors.last)}
										helperText={formik.touched.last && formik.errors.last}
									/>
								</ThemeProvider>
							</div>
						</div>

						<div className={style.email}>
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

						<div className={style.contraseña}>
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

						<div className={style.containerButtonRegister}>
							<ThemeProvider theme={theme}>
								<Button disabled={isFetching} fullWidth={true} type="submit" color={'secondary'} size={'large'} variant="contained" sx={{ '&:hover': { backgroundColor: '#163440' } }} >{t('register.create')}</Button>
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
				</div>

				<div className={style.containerGoogleRegister} onClick={() => handleOnGoogle()}>
					<p>
						{t('register.regis')}<img src={Google} alt="Google" />
					</p>
				</div>

				<div className={style.siCuenta}>
					<p>{t('register.haveOne')}</p>
					<Link to="/login">{t('login.enter')}</Link>
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

export default Register;
