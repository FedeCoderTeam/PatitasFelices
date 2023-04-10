import axios from 'axios';
import {addAllPerson} from '@/_redux/reducer/personReducer';
import {AppDispatch} from '@/_redux/store';


export const addAllPersonAsync = () => {
    return async function(dispatch: AppDispatch) {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
            dispatch(addAllPerson(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}