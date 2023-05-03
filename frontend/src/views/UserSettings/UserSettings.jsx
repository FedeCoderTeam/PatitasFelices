import * as React from 'react';
import style from '../UserSettings/UserSettings.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as authAction from '../../_redux/actions/authAction';
// import { useNavigate, useParams } from 'react-router-dom';
// import validation from './Validations/Validations';
// import validationEmpty from './Validations/ValidationsEmpty';
import CloudinaryWidget from '../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
// import useToast from '../../utils/hooks/useToast';
import Avatar from '@mui/material/Avatar';
import {TextField} from '@mui/material';
import {useFormik} from 'formik';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';


const UserSettings = () =>{

	const dispatch = useDispatch()

    const userId = useSelector((state) => state.authReducer.user);
	const token = useSelector(state => state.authReducer.token)

	const [modeEditUser, setModeEditUser] = useState(true)
	const [modeEditPass, setModeEditPass] = useState(true)
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
		alert(JSON.stringify(values, null, 2))
	}

	const handleSubmitPass = (values) => {
		dispatch(authAction.changePasswordAction(token, values.currentPassword, values.newPassword))
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
	}, [userId])


    return(
		<div className={style.mainContainer}>
			{userId &&
			<>
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
				<div>
					<h2>General info</h2>
					<IconButton onClick={() => setModeEditUser(!modeEditUser)}>
						<EditIcon />
					</IconButton>
					<TextField
						name={'name'}
						label={'Nombre'}
						variant={'filled'}
						disabled={modeEditUser}
						defaultValue={initialValuesUser.name}
						value={formikUser.values.name}
						onChange={formikUser.handleChange}
						error={formikUser.touched.name && Boolean(formikUser.errors.name)}
						helperText={formikUser.touched.name && formikUser.errors.name}
					/>
					<TextField
						name={'last'}
						label={'Apellido'}
						variant={'filled'}
						disabled={modeEditUser}
						defaultValue={initialValuesUser.last}
						value={formikUser.values.last}
						onChange={formikUser.handleChange}
						error={formikUser.touched.last && Boolean(formikUser.errors.last)}
						helperText={formikUser.touched.last && formikUser.errors.last}
					/>
					<div className={style.containerUploadForm}>
						{url ? (
							<div className={style.divCloudinaryBtn}>
								<CloudinaryWidgetFull url={userId.image} setUrl={(url) => {
									formikUser.setFieldValue('image', url)
									setUrl(url)
								}} setDisabled={modeEditUser} />
							</div>
						) : (
							<div className={style.divCloudinaryBtn}>
								<CloudinaryWidget url={formikUser.values.image} setUrl={(url) => {
									formikUser.setFieldValue('image', url)
									setUrl(url)
								}} setDisabled={modeEditUser} />
							</div>
						)}
						<div className={style.divImgUser}>
							<img
								className={style.imgUser}
								src={formikUser.values.image || userId.image}
								loading="lazy"
								alt=""
							/>
						</div>
					</div>
					<button type={'submit'} disabled={modeEditUser} onClick={formikUser.handleSubmit}>Actualizar</button>
				</div>
				{ !userId.googleId && <>
					<div>
						<h2>Cambiar contraseña</h2>
						<IconButton onClick={() => setModeEditPass(!modeEditPass)}>
							<EditIcon />
						</IconButton>
						<TextField
							name={'currentPassword'}
							label={'Contraseña actual'}
							variant={'filled'}
							type={'password'}
							disabled={modeEditPass}
							value={formikPassword.values.currentPassword}
							onChange={formikPassword.handleChange}
							error={formikPassword.touched.currentPassword && Boolean(formikPassword.errors.currentPassword)}
							helperText={formikPassword.touched.currentPassword && formikPassword.errors.currentPassword}
						/>
						<TextField
							name={'newPassword'}
							label={'Contraseña nueva'}
							variant={'filled'}
							type={'password'}
							disabled={modeEditPass}
							value={formikPassword.values.newPassword}
							onChange={formikPassword.handleChange}
							error={formikPassword.touched.newPassword && Boolean(formikPassword.errors.newPassword)}
							helperText={formikPassword.touched.newPassword && formikPassword.errors.newPassword}
						/>
						<TextField
							name={'repeatNewPassword'}
							label={'Repetir contraseña nueva'}
							variant={'filled'}
							type={'password'}
							disabled={modeEditPass}
							value={formikPassword.values.repeatNewPassword}
							onChange={formikPassword.handleChange}
							error={formikPassword.touched.repeatNewPassword && Boolean(formikPassword.errors.repeatNewPassword)}
							helperText={formikPassword.touched.repeatNewPassword && formikPassword.errors.repeatNewPassword}
						/>
						<button disabled={modeEditPass} onClick={formikPassword.handleSubmit}>Actualizar contraseña</button>
					</div>
				</> }
			</>
			}
		</div>
	)
};

export default UserSettings;