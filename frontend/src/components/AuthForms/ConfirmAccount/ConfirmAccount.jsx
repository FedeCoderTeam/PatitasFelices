import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
import { verifyUserAction } from '../../../_redux/actions/authAction'

const ConfirmAccount = () => {

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = searchParams.get('token')

    useEffect(() => {
        if(token) {
            dispatch(verifyUserAction(token)).then(() => {
                navigate('/home')
            })
        } else {
            navigate('/home')
        }
    }, [dispatch, navigate, token])

    return (
        <div style={{minHeight: 'calc(100vh - 172px)'}}>
        </div>
    );
};

export default ConfirmAccount;
