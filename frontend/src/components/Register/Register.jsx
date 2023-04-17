import React from 'react';
import Google from './Google.png';
import { Link } from 'react-router-dom';
import './Register.css';
// import RegisterImg from 'registerImage.png'

const Register = () => {
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
							<input type="text" />
						</div>

						<div className="apellido">
							<label>Apellido</label>
							<input type="text" />
						</div>
					</div>

					<div className="email">
						<label>Email</label>
						<input type="email" />
					</div>

					<div className="contraseña">
						<label>Contraseña</label>
						<input type="password" />
					</div>

					<div className="containerButton-Register">
						<button type="submit" className="buttonRegister">
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
