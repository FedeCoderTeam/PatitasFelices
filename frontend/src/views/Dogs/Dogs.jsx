import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import Filtros from '../../components/Filtros/Filtros.jsx';


const Dogs = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.dogsReducer.temperaments)

    useEffect(() => {
            dispatch(dogsAction.getTemperaments())
        },[dispatch])
        
    return(
        <>
            <TextField id="outlined-basic" label="Buscar..." variant="outlined" />
            <TextField id="filled-basic" label="Buscar..." variant="filled" />
            <TextField id="standard-basic" label="Buscar..." variant="standard" />
            <Filtros temperaments={selector} />
        </>
    )
}

export default Dogs;