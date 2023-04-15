import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import * as dogsAction from "../../../_redux/actions/dogsAction.js";

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
            <div>
                <TextField
                id="filled-basic" 
                label="Buscar..." 
                variant="filled"
                onChange={(e) => handleInputChange(e)}
                />
                <button onClick={(e) => handleOnClick(e)} >🔍</button>
            </div>
        </>
    )
}

export default SearchDog;