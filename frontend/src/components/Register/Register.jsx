import React, { useRef } from 'react';
import Google from './Google.png';
import {Link, useNavigate} from 'react-router-dom';
import style from './Register.module.css';
import { useDispatch } from 'react-redux';

// import RegisterImg from 'registerImage.png'
import { registerUserAction, googleUserAction, setShowOverlayAction } from '../../_redux/actions/authAction';
import Swal from 'sweetalert2';

const Register = () => {
	const dispatch = useDispatch();

	const refName = useRef(null);
	const refLast = useRef(null);
	const refEmail = useRef(null);
	const refPass = useRef(null);

	const handleOnRegister = () => {
		if (
			!refName.current.value ||
			!refLast.current.value ||
			!refEmail.current.value ||
			!refPass.current.value
		) {
			return;
		}
		dispatch(
			registerUserAction(
				refName.current.value,
				refLast.current.value,
				refEmail.current.value,
				refPass.current.value,
			),
		);
	};

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

	return (
		<div className={style.mainContainerRegister} data-aos="fade-left">
			<div className={style.formRegister}>
				<div className={style.title}>
					<h1>Registrarse</h1>
				</div>

				<div className={style.containerInputsRegister}>
					<div className={style.personalInfo}>
						<div className={style.nombre}>
							<label>Nombre</label>
							<input type="text" ref={refName} />
						</div>

						<div className={style.apellido}>
							<label>Apellido</label>
							<input type="text" ref={refLast} />
						</div>
					</div>

					<div className={style.email}>
						<label>Email</label>
						<input type="email" ref={refEmail} />
					</div>

					<div className={style.contraseña}>
						<label>Contraseña</label>
						<input type="password" ref={refPass} />
					</div>

					<div className={style.containerButtonRegister}>
						<button
							type="submit"
							className={style.buttonRegister}
							onClick={handleOnRegister}
						>
							<Link to='/home'>Crear cuenta</Link>
						</button>
					</div>
				</div>

				<div className={style.containerGoogleRegister} onClick={() => handleOnGoogle()}>
					<p>
						Registrarse con <img src={Google} alt="Google" />
					</p>
				</div>

				<div className={style.siCuenta}>
					<p>¿Ya tienes una cuenta? </p>
					<Link to="/login">Ingresa</Link>
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
