import React, { useRef } from 'react';
import Google from './Google.png';
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../_redux/actions/authAction';

const Login = () => {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.authReducer)
	const navigate = useNavigate();

	const refEmail = useRef(null);
	const refPass = useRef(null);

	const handleOnLogin = () => {
		if (!refEmail.current.value || !refPass.current.value) {
		} else {
			dispatch(
				authActions.loginUserAction(
					refEmail.current.value,
					refPass.current.value,
				)
			)
		}
	};

	if(selector.isAuthenticated) {
		navigate('/home')
		return null;
	}

	return (
		<div className={style.mainContainerLogin}>
			<div className={style.formLogin}>
				<div className={style.title}>
					<h1>Ingresar</h1>
				</div>

				<div className={style.containerInputsLogin}>
					<div className={style.emailForm}>
						<label>Email</label>
						<input type="email" ref={refEmail} />
					</div>

					<div className={style.contraseñaForm}>
						<label>Contraseña</label>
						<input type="password" ref={refPass} />
					</div>
				</div>

				<div className={style.recuperarContraseña} onClick={() => navigate('/request-password-reset')}>
					<p>¿Olvidaste tu contraseña?</p>
				</div>

				<div className={style.containerButtonLogin}>
					<button
						type="submit"
						className={style.ingresarBoton}
						onClick={handleOnLogin}
					>
						Ingresar
					</button>
				</div>

				<div className={style.containerGoogleLogin}>
					<p>
						Ingresar con <img src={Google} alt="Google" />
					</p>
				</div>

				<div className={style.noCuenta}>
					<p>¿No tienes cuenta? </p>
					<Link to="/register">Regístrate</Link>
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
