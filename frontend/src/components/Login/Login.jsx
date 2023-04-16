import React, {useRef} from 'react';
import Google from './Google.png'
import {Link, useNavigate} from 'react-router-dom';
import style from './login.module.css';
import {useDispatch} from 'react-redux';
import * as authActions from '../../_redux/actions/authAction';

const Login = () => {

  const dispatch = useDispatch()
  // const selector = useSelector((state) => state.authReducer)
  const navigate = useNavigate()

  const refEmail = useRef(null)
  const refPass = useRef(null)

  const handleOnLogin = () => {
    if(!refEmail.current.value || !refPass.current.value) {
      console.log('no ejecuta')
    } else {
      dispatch(authActions.loginUserAction(refEmail.current.value, refPass.current.value)).then(navigate('/home'))
    }
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

        <div className={style.recuperarContraseña}>
          <p>¿Olvidaste tu contraseña?</p>
        </div>

        <div className={style.containerButtonLogin}>
          <button type='submit' className={style.ingresarBoton} onClick={handleOnLogin}>Ingresar</button>
        </div>
        
        <div className={style.containerGoogleLogin}>
          <p>Ingresar con <img src={Google} alt="Google" /></p>
        </div>
        
        <div className={style.noCuenta}>
          <p>¿No tienes cuenta? </p>
          <Link to='/register'>Regístrate</Link>
        </div>

        <div>
          <Link to='/home' className={style.goHome}>
            <i class="fa-solid fa-house"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
