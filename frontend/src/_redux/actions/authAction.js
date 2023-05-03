import {
	setIsFetching,
	setShowOverlay,
	setStatusVerify,
	setUser,
	getAllUsers,
	setIsFetchingAuth,
} from '../reducer/authReducer';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3001';

const authUserAction = () => {
	return async function (dispatch) {
		dispatch(setIsFetchingAuth(true));
		dispatch(setIsFetching(true));
		try {
			let result = await axios.post(
				`${URL}/auth`,
				{},
				{ withCredentials: true },
			);
			dispatch(setUser(result.data));
			dispatch(setIsFetchingAuth(false));
			dispatch(setIsFetching(false));
		} catch (error) {
			dispatch(setUser(error.response.data));
			dispatch(setIsFetchingAuth(false));
			dispatch(setIsFetching(false));
		}
	};
};

const registerUserAction = (name, last, email, password, setIsSuccess) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			await axios.post(`${URL}/auth/register`, { name, last, email, password });
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: '¡Registro exitoso!',
				text: 'Por favor, revisa tu correo electrónico para verificar tu cuenta.',
				icon: 'success',
				timer: 5000,
			});
			setIsSuccess(true);
		} catch (error) {
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: 'Oops...',
				text: error.response.data.error,
				icon: 'error',
				timer: 5000,
			});
		}
	};
};

const loginUserAction = (email, password) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		dispatch(setIsFetchingAuth(true));
		try {
			let result = await axios.post(
				`${URL}/auth/login`,
				{ email, password },
				{ withCredentials: true },
			);
			dispatch(setUser(result.data));
			dispatch(setIsFetching(false));
			dispatch(setIsFetchingAuth(false));
			await Swal.fire({
				title: `¡Hola ${result.data.user.name}!`,
				text: 'Ha iniciado sesión correctamente',
				icon: 'success',
				timer: 5000,
			});
		} catch (error) {
			dispatch(setIsFetching(false));
			dispatch(setIsFetchingAuth(false));
			await Swal.fire({
				title: 'Oops...',
				text: error.response.data.error,
				icon: 'error',
				timer: 5000,
			});
		}
	};
};

const logoutUserAction = (id) => {
	return async function (dispatch) {
		dispatch(setIsFetchingAuth(true));
		try {
			let result = await axios.post(
				`${URL}/auth/logout`,
				{ id },
				{ withCredentials: true },
			);
			dispatch(setUser(result.data));
			dispatch(setIsFetchingAuth(false));
		} catch (error) {
			dispatch(setIsFetchingAuth(false));
		}
	};
};

const verifyUserAction = (token) => {
	return async function (dispatch) {
		dispatch(setIsFetchingAuth(true));
		try {
			const result = await axios.post(
				`${URL}/auth/verify-account`,
				{ token },
				{ withCredentials: true },
			);
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 2000,
			});
			dispatch(setUser(result.data));
			Swal.fire({
				title: `¡Hola ${result.data.user.name}!`,
				text: 'Ha iniciado sesión correctamente',
				icon: 'success',
				timer: 5000,
			});
			dispatch(setIsFetchingAuth(false));
		} catch (error) {
			dispatch(setIsFetchingAuth(false));
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 2000,
			});
		}
	};
};

const requestPasswordResetAction = (email) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			const result = await axios.post(`${URL}/auth/request-password-reset`, {
				email,
			});
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 5000,
			});
			dispatch(setIsFetching(false));
		} catch (error) {
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 5000,
			});
			dispatch(setIsFetching(false));
		}
	};
};

const verifyPasswordResetAction = (token) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			const result = await axios.post(`${URL}/auth/verify-password-reset`, {
				token,
			});
			dispatch(setStatusVerify(result.data.message));
			dispatch(setIsFetching(false));
		} catch (error) {
			dispatch(setStatusVerify(error.response.data.message));
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 5000,
			});
		}
	};
};

const confirmPasswordResetAction = (token, password) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			const result = await axios.post(`${URL}/auth/password-reset`, {
				token,
				password,
			});
			await Swal.fire({
				title: result.data.message,
				icon: 'success',
				timer: 5000,
			});
			dispatch(setIsFetching(false));
		} catch (error) {
			dispatch(setIsFetching(false));
			await Swal.fire({
				title: error.response.data.error,
				icon: 'error',
				timer: 5000,
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
		dispatch(setIsFetchingAuth(true));
		try {
			dispatch(setUser(payload));
			dispatch(setIsFetchingAuth(false));
			await Swal.fire({
				title: `¡Hola ${payload.user.name}!`,
				text: 'Has iniciado sesión correctamente',
				icon: 'success',
				timer: 10000,
			});
		} catch (error) {
			console.log(error.message);
			dispatch(setIsFetchingAuth(false));
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

const getUserById = (id) => {
	return async function (dispatch) {
		try {
			const dbData = await axios.get(`${URL}/users/${id}`);
			dispatch(getUserDetail(dbData.data));
		} catch (error) {
			console.log(error);
		}
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
	getUserById,
};
