import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import * as productsAction from "../../../_redux/actions/productsAction.js";

const SearchProduct = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState('')

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleOnClick = () => {
        dispatch(productsAction.getProductsByName(input))
        setInput("");
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

export default SearchProduct;