import {
	setIsFetching,
	setIsRegisterFetching,
	setShowOverlay,
	setStatusVerify,
	setUser,
	getAllUsers,
	setIsSuccess,
} from '../reducer/authReducer';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

const URL = 'http://localhost:3001';

const authUserAction = () => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			let result = await axios.post(
				`${URL}/auth`,
				{},
				{ withCredentials: true },
			);
			dispatch(setUser(result.data));
			dispatch(setIsFetching(false));
		} catch (error) {
			dispatch(setIsFetching(false));
		}
	};
};

const registerUserAction = (name, last, email, password, setIsSuccess) => {
	return async function (dispatch) {
		dispatch(setIsRegisterFetching(true));
		try {
			await axios.post(`${URL}/auth/register`, { name, last, email, password });
			dispatch(setIsRegisterFetching(false));
			await Swal.fire({
				title: '¡Registro exitoso!',
				text: 'Por favor, revisa tu correo electrónico para verificar tu cuenta.',
				icon: 'success',
				timer: 10000,
			});
			setIsSuccess(true)
		} catch (error) {
			dispatch(setIsRegisterFetching(false));
			await Swal.fire({
				title: 'Oops...',
				text: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const loginUserAction = (email, password) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			let result = await axios.post(
				`${URL}/auth/login`,
				{ email, password },
				{ withCredentials: true },
			);
			dispatch(setUser(result.data));
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: `¡Hola ${result.data.user.name}!`,
				text: 'Ha iniciado sesión correctamente',
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: 'Oops...',
				text: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const logoutUserAction = (id) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			let result = await axios.post(
				`${URL}/auth/logout`,
				{ id },
				{ withCredentials: true },
			);
			dispatch(setUser(result.data));
			dispatch(setIsFetching(false));
		} catch (error) {
			dispatch(setIsFetching(false));
		}
	};
};

const verifyUserAction = (token) => {
	return async function () {
		try {
			const result = await axios.post(`${URL}/auth/verify-account`, { token });
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const requestPasswordResetAction = (email) => {
	return async function () {
		try {
			const result = await axios.post(`${URL}/auth/request-password-reset`, {
				email,
			});
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const verifyPasswordResetAction = (token) => {
	return async function (dispatch) {
		try {
			const result = await axios.post(`${URL}/auth/verify-password-reset`, {
				token,
			});
			dispatch(setStatusVerify(result.data.message));
		} catch (error) {
			dispatch(setStatusVerify(error.response.data.message));
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const confirmPasswordResetAction = (token, password) => {
	return async function () {
		try {
			const result = await axios.post(`${URL}/auth/password-reset`, {
				token,
				password,
			});
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const changePasswordAction = (token, currentPassword, newPassword) => {
	return async function () {
		try {
			const result = await axios.post(`${URL}/auth/change-password`, {
				token,
				currentPassword,
				newPassword,
			});
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 10000,
			});
		}
	};
};

const googleUserAction = (payload) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			dispatch(setUser(payload));
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: `¡Hola ${payload.user.name}!`,
				text: 'Has iniciado sesión correctamente',
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			console.log(error.message);
			dispatch(setIsFetching(false));
		}
	};
};

const setShowOverlayAction = (payload) => {
	return function (dispatch) {
		dispatch(setShowOverlay(payload));
	};
};

const getUsers = () => {
	return async function (dispatch) {
		let users = await axios.get(`${URL}/users`);
		dispatch(getAllUsers(users.data));
	};
};

const updateUser = (obj) => {
	return async () => {
		try {
			let newRole = await axios.put(`${URL}/users`, obj);
			return newRole.data;
		} catch (error) {
			console.log(error);
		}
	};
};

export {
	authUserAction,
	registerUserAction,
	loginUserAction,
	logoutUserAction,
	verifyUserAction,
	requestPasswordResetAction,
	verifyPasswordResetAction,
	confirmPasswordResetAction,
	changePasswordAction,
	googleUserAction,
	setShowOverlayAction,
	getUsers,
	updateUser,
};
