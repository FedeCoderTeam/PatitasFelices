import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import style from './RequestPasswordReset.module.css';
import { useDispatch } from 'react-redux';
import { requestPasswordResetAction } from '../../../_redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const RequestPasswordReset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refEmail = useRef(null);

    const handleOnRequestPasswordReset = () => {
        if (!refEmail.current.value) return;
        dispatch(requestPasswordResetAction(refEmail.current.value));
    };

    return (
        <div className={style.mainContainerRecover} data-aos="fade-left">
            <div className={style.formRecover}>
                <div className={style.title}>
                    <h1>Recuperar cuenta</h1>
                </div>

                <div className={style.containerInputsRecover}>

                    <div className={style.email}>
                        <label>Email</label>
                        <input type="email" ref={refEmail} />
                    </div>

                    <div className={style.remeberPassword} onClick={() => navigate('/login')}>
                        <p>¿Recordaste tu contraseña?</p>
                    </div>

                    <div className={style.containerButtonRecover}>
                        <button
                            type="submit"
                            className={style.buttonRecover}
                            onClick={handleOnRequestPasswordReset}
                        >
                            Recuperar cuenta
                        </button>
                    </div>
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

export default RequestPasswordReset;
