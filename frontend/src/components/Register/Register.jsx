import React from 'react';
import Google from './Google.png'
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    return (
        // Faltaría corregir la imagen para poder ponerla de fondo
        // ya que se repite y queda cortada/fea
        <div className='mainContainer-Register'>
            <div className='form-Register'>
                <h1>Registrarse</h1>
                <div className='containerInputs-Register'>
                    <label>Nombre</label>
                    <input type="text" />
                    <label>Apellido</label>
                    <input type="text" />
                    <label>Email</label>
                    <input type="email" />
                    <label>Contraseña</label>
                    <input type="password" />
                <div className='containerButton-Register'>
                <button type='submit'>Crear Cuenta</button>
                </div>
                </div>
                <div className='containerGoogle-Register'>
                <p>Registrarse con <img src={Google} alt="Google" /></p>
                </div>
                <div>
                <p>¿Ya tienes cuenta? </p>
                <Link to='/login'>Ingresa</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
