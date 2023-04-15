import { setIsFetching, loginUser, authUser } from '../reducer/authReducer';
import axios from 'axios';
const URL = 'http://localhost:3001'

const loginUserAction = (email, password) => {
    return async function(dispatch) {
        dispatch(setIsFetching(true))
        try {
            let result = await axios.post(`${URL}/users/login`, {email, password})
            dispatch(loginUser(result.data))
            dispatch(setIsFetching(false))
        } catch (error) {
            console.log(error)
            dispatch(setIsFetching(false))
        }
    }
}

const authUserAction = () => {
    return async function(dispatch) {
        dispatch(setIsFetching(true))
        try {
            let result = await axios.post(`${URL}/users/auth`)
            dispatch(authUser(result.data))
            dispatch(setIsFetching(false))
        } catch (error) {
            console.log(error)
            dispatch(setIsFetching(false))
        }
    }
}

export {
    loginUserAction,
    authUserAction
}