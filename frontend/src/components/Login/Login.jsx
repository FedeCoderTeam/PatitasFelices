import React from 'react';
import Google from './Google.png'
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className='mainContainer-Login'>
    <div className='form-Login'>
        <h1>Ingresar</h1>
        <div className='containerInputs-Login'>
            <label>Email</label>
            <input type="email" />
            <label>Contraseña</label>
            <input type="password" />
        <div className='containerButton-Login'>
        <button type='submit'>Ingresar</button>
        </div>
        </div>
        <div className='containerGoogle-Login'>
        <p>Ingresar con <img src={Google} alt="Google" /></p>
        </div>
        <div>
        <p>¿No tienes cuenta? </p>
        <Link to='/register'>Registrate</Link>
        </div>
    </div>
</div>
  )
}

export default Login
