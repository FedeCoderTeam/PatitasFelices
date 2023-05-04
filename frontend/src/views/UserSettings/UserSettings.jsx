import * as React from 'react';
import style from '../UserSettings/UserSettings.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as authAction from '../../_redux/actions/authAction';
import CloudinaryWidget from '../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import Avatar from '@mui/material/Avatar';
import {Button, CircularProgress, createTheme, Fab, TextField, ThemeProvider} from '@mui/material';
import {useFormik} from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import Grid2 from '@mui/material/Unstable_Grid2';
import useToast from '../../utils/hooks/useToast';
import {useNavigate} from 'react-router-dom';


const UserSettings = () =>{

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const toast = useToast();

    const userId = useSelector((state) => state.authReducer.user);
	const token = useSelector(state => state.authReducer.token)
	const isFetching = useSelector(state => state.authReducer.isFetching)
	const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)

	const [modeEditUser, setModeEditUser] = useState(false)
	const [modeEditPass, setModeEditPass] = useState(false)
	let [url, setUrl] = useState('');


	const initialValuesUser = {
		name: userId && userId.name ? userId.name : '',
		last: userId && userId.last ? userId.last : '',
		image: userId && userId.image ? userId.image : ''
	}

	const initialValuesPass = {
		currentPassword: '',
		newPassword: '',
		repeatNewPassword: ''
	}

	const validationSchemaUser = Yup.object({
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
	})

	const validationSchemaPass = Yup.object({
		currentPassword: Yup
			.string()
			.min(6, 'Password should be of minimum 6 characters length')
			.max(32, 'Password should be of minimum 32 characters length')
			.matches(/^\S+$/, 'Cannot contain spaces')
			.required('Password is required'),
		newPassword: Yup
			.string()
			.min(6, 'Password should be of minimum 6 characters length')
			.max(32, 'Password should be of minimum 32 characters length')
			.matches(/^\S+$/, 'Cannot contain spaces')
			.required('Password is required'),
		repeatNewPassword: Yup
			.string()
			.oneOf([Yup.ref('newPassword'), null], 'Password must match')
	})

	const handleSubmitUser = (values) => {
		setModeEditUser(false)
		if(values.name === userId.name && values.last === userId.last && values.image === userId.image) {
			toast.error('Actualización cancelada', { duration: 4000 })
			return;
		}
		dispatch(authAction.updateUserByOwnAction(token, values.name, values.last, values.image))
	}

	const handleSubmitPass = (values) => {
		setModeEditPass(false)
		dispatch(authAction.changePasswordAction(token, values.currentPassword, values.newPassword))
		formikPassword.resetForm()
	}

	const formikUser = useFormik({
		initialValues: initialValuesUser,
		validationSchema: validationSchemaUser,
		onSubmit: handleSubmitUser
	})

	const formikPassword = useFormik({
		initialValues: initialValuesPass,
		validationSchema: validationSchemaPass,
		onSubmit: handleSubmitPass
	})

	useEffect(() => {
		formikUser.setValues({...initialValuesUser})
	}, [userId, isFetching, isAuthenticated, navigate])

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

	const handleSetEditModeUser = () => {
		setModeEditUser(!modeEditUser)
		setModeEditPass(false)
	}

	const handleSetEditModePass = () => {
		if(userId.googleId) {
			toast.error('Con Google iniciado no está disponible para cambio de contraseña', { duration: 4000 })
			return
		}
		setModeEditPass(!modeEditPass)
		setModeEditUser(false)
	}

    return(
		<div className={style.mainContainer}>
			{userId &&
			<div className={style.containerBox}>
				<div className={style.avatar}>
					<Avatar
						alt={userId.name}
						src={userId.image}
						imgProps={{ referrerPolicy: "no-referrer" }}
						sx={{ width: 100, height: 100 }}
					/>
					<div>
						<h1>{userId.name} {userId.last}</h1>
						{userId.role !== 'Usuario' ? <h2>{userId.role}</h2> : ''}
					</div>
				</div>

				<Grid2 container spacing={3} sx={{marginTop: '20px'}}>
					<Grid2 xs={6}>
						<div className={style.container}>
							<div className={style.title}>
								<h2>Información general</h2>
								<Fab onClick={() => handleSetEditModeUser()} size={'small'} sx={{marginTop: '15px', marginLeft: '165px', color: '#592519'}}>
									<EditIcon color={'black'} />
								</Fab>
							</div>
							<div className={style.containerInputs}>
								<div className={style.inputs}>
									<ThemeProvider theme={theme}>
										<TextField
											fullWidth
											name={'name'}
											label={'Nombre'}
											variant={'filled'}
											disabled={!modeEditUser}
											defaultValue={initialValuesUser.name}
											value={formikUser.values.name}
											onChange={formikUser.handleChange}
											error={formikUser.touched.name && Boolean(formikUser.errors.name)}
											helperText={formikUser.touched.name && formikUser.errors.name}
										/>
									</ThemeProvider>
								</div>
								<div className={style.inputs}>
									<ThemeProvider theme={theme}>
										<TextField
											fullWidth
											name={'last'}
											label={'Apellido'}
											variant={'filled'}
											disabled={!modeEditUser}
											defaultValue={initialValuesUser.last}
											value={formikUser.values.last}
											onChange={formikUser.handleChange}
											error={formikUser.touched.last && Boolean(formikUser.errors.last)}
											helperText={formikUser.touched.last && formikUser.errors.last}
										/>
									</ThemeProvider>
								</div>
								<div className={style.containerUploadForm}>
									<div>
										<div className={style.divImgUser}>
											<img
												src={formikUser.values.image || userId.image}
												loading="lazy"
												alt=""
											/>
										</div>
										{url ? (
											<div className={`${style.divCloudinaryBtn} ${!modeEditUser ? style.disableButton : ''}`}>
												<CloudinaryWidgetFull url={userId.image} setUrl={(url) => {
													formikUser.setFieldValue('image', url)
													setUrl(url)
												}} setDisabled={!modeEditUser} />
											</div>
										) : (
											<div className={`${style.divCloudinaryBtn} ${!modeEditUser ? style.disableButton : ''}`}>
												<CloudinaryWidget url={formikUser.values.image} setUrl={(url) => {
													formikUser.setFieldValue('image', url)
													setUrl(url)
												}} setDisabled={!modeEditUser} />
											</div>
										)}
									</div>
								</div>
								<div className={style.button}>
									<ThemeProvider theme={theme}>
										<Button disabled={!modeEditUser} fullWidth={true} type={'button'} color={'secondary'} size={'large'} variant="contained" sx={{ '&:hover': { backgroundColor: '#163440' } }} onClick={formikUser.handleSubmit} >Actualizar</Button>
										{ isFetching && (<CircularProgress size={24} sx={{
											color: '#D9AD77',
											position: 'absolute',
											top: '50%',
											left: '50%',
											marginTop: '-12px',
											marginLeft: '-12px',
										}}></CircularProgress>)}
									</ThemeProvider>
								</div>
							</div>
						</div>
					</Grid2>
					<Grid2 xs={6}>
						<div className={style.container}>
							<div className={style.title}>
								<h2>Cambiar contraseña</h2>
								<Fab onClick={() => handleSetEditModePass()} size={'small'} sx={{marginTop: '15px', marginLeft: '160px', color: '#592519'}}>
									<EditIcon />
								</Fab>
							</div>
							<div className={style.containerInputs}>
								<div className={style.inputs}>
									<ThemeProvider theme={theme}>
										<TextField
											fullWidth
											name={'currentPassword'}
											label={'Contraseña actual'}
											variant={'filled'}
											type={'password'}
											disabled={!modeEditPass}
											value={formikPassword.values.currentPassword}
											onChange={formikPassword.handleChange}
											error={formikPassword.touched.currentPassword && Boolean(formikPassword.errors.currentPassword)}
											helperText={formikPassword.touched.currentPassword && formikPassword.errors.currentPassword}
										/>
									</ThemeProvider>
								</div>
								<div className={style.inputs}>
									<ThemeProvider theme={theme}>
										<TextField
											fullWidth
											name={'newPassword'}
											label={'Contraseña nueva'}
											variant={'filled'}
											type={'password'}
											disabled={!modeEditPass}
											value={formikPassword.values.newPassword}
											onChange={formikPassword.handleChange}
											error={formikPassword.touched.newPassword && Boolean(formikPassword.errors.newPassword)}
											helperText={formikPassword.touched.newPassword && formikPassword.errors.newPassword}
										/>
									</ThemeProvider>
								</div>
								<div className={style.inputs}>
									<ThemeProvider theme={theme}>
										<TextField
											fullWidth
											name={'repeatNewPassword'}
											label={'Repetir contraseña nueva'}
											variant={'filled'}
											type={'password'}
											disabled={!modeEditPass}
											value={formikPassword.values.repeatNewPassword}
											onChange={formikPassword.handleChange}
											error={formikPassword.touched.repeatNewPassword && Boolean(formikPassword.errors.repeatNewPassword)}
											helperText={formikPassword.touched.repeatNewPassword && formikPassword.errors.repeatNewPassword}
										/>
									</ThemeProvider>
								</div>
								<div className={style.button}>
									<ThemeProvider theme={theme}>
										<Button disabled={!modeEditPass} fullWidth={true} type={'button'} color={'secondary'} size={'large'} variant="contained" sx={{ '&:hover': { backgroundColor: '#163440' } }} onClick={formikPassword.handleSubmit} >Actualizar</Button>
										{ isFetching && (<CircularProgress size={24} sx={{
											color: '#D9AD77',
											position: 'absolute',
											top: '50%',
											left: '50%',
											marginTop: '-12px',
											marginLeft: '-12px',
										}}></CircularProgress>)}
									</ThemeProvider>
								</div>
							</div>
						</div>
					</Grid2>
				</Grid2>

			</div>
			}
		</div>
	)
};

export default UserSettings;