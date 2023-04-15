import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import * as dogsAction from "../../../_redux/actions/dogsAction.js";
import style from './searchDog.module.css'

const SearchDog = () => {

    const dispatch = useDispatch();

    const [inputDog, setInputDog] = useState('')

    const handleInputChange = (e) => {
        setInputDog(e.target.value)
    }

    const handleOnClick = () => {
        dispatch(dogsAction.getDogsByName(inputDog))
        setInputDog("");
    }

    return(
        <>
            <div className={style.searchBar}>
                {/* <TextField
                id="filled-basic" 
                label="Buscar..." 
                variant="filled"
                onChange={(e) => handleInputChange(e)}
                /> */}
                <input className={style.input} type='search' placeholder='Search...' onChange={handleInputChange}/>
                {/* <button onClick={(e) => handleOnClick(e)} >🔍</button> */}
            </div>
        </>
    )
}

export default SearchDog;