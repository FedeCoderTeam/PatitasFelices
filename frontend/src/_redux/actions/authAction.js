import {setIsFetching, loginUser, authUser, logoutUser} from '../reducer/authReducer';
import axios from 'axios';

const URL = 'http://localhost:3001'

const loginUserAction = (email, password) => {
    return async function(dispatch) {
        dispatch(setIsFetching(true))
        try {
            let result = await axios.post(`${URL}/users/login`, {email, password}, {withCredentials: true})
            dispatch(loginUser(result.data))
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
            dispatch(authUser(result.data))
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
            dispatch(logoutUser(result.data))
            dispatch(setIsFetching(false))
        } catch (error) {
            dispatch(setIsFetching(false))
        }
    }
}

export {
    loginUserAction,
    authUserAction,
    logoutUserAction
}