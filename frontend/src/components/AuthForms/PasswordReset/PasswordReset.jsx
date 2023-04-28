import React, {useEffect, useRef} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import './passwordReset.css';
import {useDispatch, useSelector} from 'react-redux';
import { verifyPasswordResetAction, confirmPasswordResetAction } from '../../../_redux/actions/authAction';

const PasswordReset = () => {

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch();
    const statusVerify = useSelector(state => state.authReducer.statusVerify)
    const navigate = useNavigate()

    const token = searchParams.get('token')

    useEffect(() => {
        if(token) {
            dispatch(verifyPasswordResetAction(token))
        } else {
            navigate('/login')
        }
    }, [dispatch])

    const refPass = useRef(null);
    const refRepeatPass = useRef(null);

    if(statusVerify === 'Unauthorized' || statusVerify === 'Authorized') {
        navigate('/login')
        return null;
    }

    const handleOnConfirmPasswordReset = () => {
        if (!refPass.current.value || !refRepeatPass.current.value) return;
        if(refPass.current.value === refRepeatPass.current.value) {
            dispatch(confirmPasswordResetAction(token, refPass.current.value));
        }
    };

    return (
        <div className="mainContainer-Register" data-aos="fade-left">
            <div className="form-Register">
                <div className="title">
                    <h1>Elige una contraseña nueva</h1>
                </div>

                <div className="containerInputs-Register">

                    <div className="contraseña">
                        <label>Contraseña</label>
                        <input type="password" ref={refPass} />
                    </div>

                    <div className="contraseña">
                        <label>Contraseña</label>
                        <input type="password" ref={refRepeatPass} />
                    </div>

                    <div className="containerButton-Register">
                        <button
                            type="submit"
                            className="buttonRegister"
                            onClick={handleOnConfirmPasswordReset}
                        >
                            Enviar
                        </button>
                    </div>
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

export default PasswordReset;
