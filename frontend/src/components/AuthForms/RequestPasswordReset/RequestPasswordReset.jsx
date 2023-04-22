import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import './RequestPasswordReset.css';
import { useDispatch } from 'react-redux';
import { requestPasswordResetAction } from '../../../_redux/actions/authAction';

const RequestPasswordReset = () => {
    const dispatch = useDispatch();

    const refEmail = useRef(null);

    const handleOnRequestPasswordReset = () => {
        if (!refEmail.current.value) return;
        dispatch(requestPasswordResetAction(refEmail.current.value));
    };

    return (
        <div className="mainContainer-Register" data-aos="fade-left">
            <div className="form-Register">
                <div className="title">
                    <h1>Recuperar cuenta</h1>
                </div>

                <div className="containerInputs-Register">

                    <div className="email">
                        <label>Email</label>
                        <input type="email" ref={refEmail} />
                    </div>

                    <div className="containerButton-Register">
                        <button
                            type="submit"
                            className="buttonRegister"
                            onClick={handleOnRequestPasswordReset}
                        >
                            Recuperar cuenta
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

export default RequestPasswordReset;
