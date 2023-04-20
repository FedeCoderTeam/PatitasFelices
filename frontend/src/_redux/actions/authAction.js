import {setIsFetching, setIsRegisterFetching, setUser} from '../reducer/authReducer';
import axios from 'axios';
import {auth} from '../../firebase'
import {GoogleAuthProvider, signInWithPopup, signInWithCredential} from 'firebase/auth'

const URL = 'http://localhost:3001'

const loginUserAction = (email, password) => {
    return async function(dispatch) {
        dispatch(setIsFetching(true))
        try {
            let result = await axios.post(`${URL}/users/login`, {email, password}, {withCredentials: true})
            dispatch(setUser(result.data))
            dispatch(setIsFetching(false))
        } catch (error) {
            dispatch(setIsFetching(false))
        }
    }
}

const authUserAction = () => {
    return async function (dispatch) {
        dispatch(setIsFetching(true))
        try {
            let result = await axios.post(`${URL}/users/auth`, {}, {withCredentials: true})
            dispatch(setUser(result.data))
            dispatch(setIsFetching(false))
        } catch (error) {
            dispatch(setIsFetching(false))
        }
    }
}

const logoutUserAction = (id) => {
    return async function (dispatch) {
        dispatch(setIsFetching(true))
        try {
            let result = await axios.post(`${URL}/users/logout`, {id}, {withCredentials: true})
            dispatch(setUser(result.data))
            dispatch(setIsFetching(false))
        } catch (error) {
            dispatch(setIsFetching(false))
        }
    }
}

const registerUserAction = (name, last, email, password) => {
    return async function(dispatch) {
        dispatch(setIsRegisterFetching(true))
        try {
            await axios.post(`${URL}/users/register`, {name, last, email, password})
            dispatch(setIsRegisterFetching(false))
        } catch (error) {
            //error.response.data.error
            dispatch(setIsRegisterFetching(false))
        }
    }
}

const userGoogleAction = () => {
    return async function(dispatch) {
        dispatch(setIsRegisterFetching(true))
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider)

            let result = await axios.post(`${URL}/users/google`, {tokenGoogle: userCredential.user?.accessToken}, {withCredentials: true})
            dispatch(setUser(result.data))
            dispatch(setIsRegisterFetching(false))
        } catch (error) {
            console.log(error.message)
            dispatch(setIsRegisterFetching(false))
        }
    }
}

const passwordRecoveryAction = (email) => {
    return async function(dispatch) {
        try {
            let result = await axios.post(`${URL}/users/recovery`, {email})
        } catch (error) {

        }
    }
}

export {
    loginUserAction,
    authUserAction,
    logoutUserAction,
    registerUserAction,
    userGoogleAction,
    passwordRecoveryAction
}