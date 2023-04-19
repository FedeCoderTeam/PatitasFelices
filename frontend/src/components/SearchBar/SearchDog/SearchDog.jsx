import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as dogsAction from "../../../_redux/actions/dogsAction.js";
import style from './SearchDog.module.css'

const SearchDog = () => {

    const dispatch = useDispatch();

    const [inputDog, setInputDog] = useState('')

    const handleInputChange = (e) => {
        setInputDog(e.target.value)
    }

    /* const handleOnClick = () => {
        dispatch(dogsAction.getDogsByName(inputDog))
        setInputDog("");
    } */

    return(
        <>
            <div className={style.searchBar}>
                <input className={style.input} type='search' placeholder='Search...' onChange={handleInputChange}/>
            </div>
        </>
    )
}

export default SearchDog;