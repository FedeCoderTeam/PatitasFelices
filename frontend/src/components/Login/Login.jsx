import React from 'react';
import Google from './Google.png'
import { Link } from 'react-router-dom';
import style from './login.module.css';

const Login = () => {
  return (
    <div className={style.mainContainerLogin}>
      <div className={style.formLogin}>

        <div className={style.title}>
          <h1>Ingresar</h1>
        </div>

        <div className={style.containerInputsLogin}>
          <div className={style.emailForm}>
              <label>Email</label>
              <input type="email" />
          </div>

          <div className={style.contraseñaForm}>
            <label>Contraseña</label>
            <input type="password" />
          </div>
        </div>

        <div className={style.recuperarContraseña}>
          <p>¿Olvidaste tu contraseña?</p>
        </div>

        <div className={style.containerButtonLogin}>
          <button type='submit' className={style.ingresarBoton}>Ingresar</button>
        </div>
        
        <div className={style.containerGoogleLogin}>
          <p>Ingresar con <img src={Google} alt="Google" /></p>
        </div>
        
        <div className={style.noCuenta}>
          <p>¿No tienes cuenta? </p>
          <Link to='/register'>Registrate</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
