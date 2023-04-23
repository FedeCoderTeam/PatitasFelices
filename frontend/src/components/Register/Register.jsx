import React, { useRef } from 'react';
import Google from './Google.png';
import {Link, useNavigate} from 'react-router-dom';
import './Register.css';
import { useDispatch } from 'react-redux';

// import RegisterImg from 'registerImage.png'
import {registerUserAction, googleUserAction, setShowOverlayAction} from '../../_redux/actions/authAction';
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
			console.log(event)
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
		<div className="mainContainer-Register" data-aos="fade-left">
			<div className="form-Register">
				<div className="title">
					<h1>Registrarse</h1>
				</div>

				<div className="containerInputs-Register">
					<div className="personalInfo">
						<div className="nombre">
							<label>Nombre</label>
							<input type="text" ref={refName} />
						</div>

						<div className="apellido">
							<label>Apellido</label>
							<input type="text" ref={refLast} />
						</div>
					</div>

					<div className="email">
						<label>Email</label>
						<input type="email" ref={refEmail} />
					</div>

					<div className="contraseña">
						<label>Contraseña</label>
						<input type="password" ref={refPass} />
					</div>

					<div className="containerButton-Register">
						<button
							type="submit"
							className="buttonRegister"
							onClick={handleOnRegister}
						>
							Crear cuenta
						</button>
					</div>
				</div>

				<div className="containerGoogle-Register" onClick={() => handleOnGoogle()}>
					<p>
						Registrarse con <img src={Google} alt="Google" />
					</p>
				</div>

				<div className="siCuenta">
					<p>¿Ya tienes una cuenta? </p>
					<Link to="/login">Ingresa</Link>
				</div>

				<div>
					<Link to="/home" className="goHome">
						<i className="fa-solid fa-house"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
