import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './RequestPasswordReset.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	loginUserAction,
	requestPasswordResetAction,
} from '../../../_redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
	Button,
	CircularProgress,
	createTheme,
	TextField,
	ThemeProvider,
} from '@mui/material';

const RequestPasswordReset = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(
		(state) => state.authReducer.isAuthenticated,
	);
	const isFetching = useSelector((state) => state.authReducer.isFetching);

	// const handleOnRequestPasswordReset = () => {
	//     if (!refEmail.current.value) return;
	//     dispatch(requestPasswordResetAction(refEmail.current.value));
	// };

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Enter a valid email')
			.required('Email is required'),
	});

	const initialValues = {
		email: '',
	};

	const handleOnSubmit = (values) => {
		dispatch(requestPasswordResetAction(values.email));
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: handleOnSubmit,
	});

	const theme = createTheme({
		palette: {
			primary: {
				main: '#163440',
			},
			secondary: {
				main: '#592519',
			},
			action: {
				disabledBackground: '#244e6b',
				disabled: '#fff',
			},
		},
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className={style.mainContainerRecover} data-aos="fade-left">
			<div className={style.formRecover}>
				<div className={style.title}>
					<h1>Recuperar cuenta</h1>
				</div>

				<form
					className={style.containerInputsRecover}
					onSubmit={formik.handleSubmit}
				>
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

					<div
						className={style.remeberPassword}
						onClick={() => navigate('/login')}
					>
						<p>¿Recordaste tu contraseña?</p>
					</div>

					<div className={style.containerButtonRecover}>
						<ThemeProvider theme={theme}>
							<Button
								disabled={isFetching}
								fullWidth={true}
								type="submit"
								color={'secondary'}
								size={'large'}
								variant="contained"
								sx={{ '&:hover': { backgroundColor: '#163440' } }}
							>
								Recuperar cuenta
							</Button>
							{isFetching && (
								<CircularProgress
									size={24}
									sx={{
										color: '#D9AD77',
										position: 'absolute',
										top: '50%',
										left: '50%',
										marginTop: '-12px',
										marginLeft: '-12px',
									}}
								></CircularProgress>
							)}
						</ThemeProvider>
					</div>
				</form>

				<div>
					<Link to="/home" className={style.goHome}>
						<i className="fa-solid fa-house"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RequestPasswordReset;
