import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import { verifyUserAction } from '../../../_redux/actions/authAction'

const ConfirmAccount = () => {

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    const token = searchParams.get('token')

    useEffect(() => {
        if(token) {
            dispatch(verifyUserAction(token))
        }
    }, [dispatch])

    return (
        <div style={{minHeight: 'calc(100vh - 172)'}} >
        </div>
    );
};

export default ConfirmAccount;
