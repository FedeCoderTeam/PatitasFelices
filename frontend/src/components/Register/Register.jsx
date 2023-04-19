import React, {useRef} from 'react';
import Google from './Google.png';
import { Link } from 'react-router-dom';
import './register.css';
import {useDispatch} from 'react-redux';

// import RegisterImg from 'registerImage.png'
import * as authAction from '../../_redux/actions/authAction'

const Register = () => {

	const dispatch = useDispatch()

	const refName = useRef(null)
	const refLast = useRef(null)
	const refEmail = useRef(null)
	const refPass = useRef(null)

	const handleOnRegister = () => {
		if(!refName.current.value || !refLast.current.value || !refEmail.current.value || !refPass.current.value) {
			return
		}
		dispatch(authAction.registerUserAction(refName.current.value, refLast.current.value, refEmail.current.value, refPass.current.value))
	}

	return (
		<div className="mainContainer-Register">
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
						<button type="submit" className="buttonRegister" onClick={handleOnRegister}>
							Crear cuenta
						</button>
					</div>
				</div>

				<div className="containerGoogle-Register">
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
						<i class="fa-solid fa-house"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
