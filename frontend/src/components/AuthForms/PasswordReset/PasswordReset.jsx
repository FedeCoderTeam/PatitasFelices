import React, { useEffect } from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import './PasswordReset.css';
import {useDispatch, useSelector} from 'react-redux';
import { verifyPasswordResetAction, confirmPasswordResetAction } from '../../../_redux/actions/authAction';
import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, CircularProgress, createTheme, TextField, ThemeProvider} from "@mui/material";

const PasswordReset = () => {

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch();
    const statusVerify = useSelector(state => state.authReducer.statusVerify)
    const isFetching = useSelector(state => state.authReducer.isFetching)
    const navigate = useNavigate()

    const token = searchParams.get('token')

    useEffect(() => {
        if(token) {
            dispatch(verifyPasswordResetAction(token)).then(() => {
                if(statusVerify === 'Unauthorized') {
                    navigate('/login')
                }
            })
        } else {
            navigate('/login')
        }

    }, [dispatch, statusVerify, navigate])

    const initialValues = {
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        password: Yup
            .string()
            .min(6, 'Password should be of minimum 6 characters length')
            .max(32, 'Password should be of minimum 32 characters length')
            .matches(/^\S+$/, 'Cannot contain spaces')
            .required('Password is required'),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
    })

    const handleOnSubmit = (values) => {
        dispatch(
            dispatch(confirmPasswordResetAction(token, values.password)).then(() => {
                navigate('/login')
            })
        )
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleOnSubmit
    })

    const theme = createTheme({
        palette: {
            primary: {
                main: '#163440'
            },
            secondary: {
                main: '#592519'
            },
            action: {
                disabledBackground: '#244e6b',
                disabled: '#fff'
            }
        }
    })

    return (
        <div className="mainContainer-Register" data-aos="fade-left">
            <div className="form-Register">
                <div className="title">
                    <h1>Elige una contraseña nueva</h1>
                </div>

                <div className="containerInputs-Register">

                    <div className="contraseña">
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled={isFetching}
                                fullWidth={true}
                                name={'password'}
                                label={'Password'}
                                type={'password'}
                                variant={'filled'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </ThemeProvider>
                    </div>

                    <div className="contraseña">
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled={isFetching}
                                fullWidth={true}
                                name={'confirmPassword'}
                                label={'Confirm Password'}
                                type={'password'}
                                variant={'filled'}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </ThemeProvider>
                    </div>

                    <div className="containerButton-Register">
                        <ThemeProvider theme={theme}>
                            <Button onClick={formik.handleSubmit} disabled={isFetching} fullWidth={true} type="submit" color={'secondary'} size={'large'} variant="contained" sx={{ '&:hover': { backgroundColor: '#163440' } }} >Enviar</Button>
                            {isFetching && (<CircularProgress size={24} sx={{
                                color: '#D9AD77',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}></CircularProgress>)}
                        </ThemeProvider>
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
