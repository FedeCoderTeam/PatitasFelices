import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as productsAction from "../../../_redux/actions/productsAction.js";
import style from './SearchProduct.module.css'

const SearchProduct = () => {

    const dispatch = useDispatch();

    const [inputProduct, setInputProduct] = useState('')

    const handleInputChange = (e) => {
        setInputProduct(e.target.value)
    }

    /* const handleOnClick = () => {
        dispatch(productsAction.getProductsByName(inputProduct))
        setInputProduct("");
    } */

    return(
        <>
            <div className={style.searchBar}>
                <input className={style.input} type='search' placeholder='Search...' onChange={handleInputChange} ></input>
            </div>
        </>
    )
}

export default SearchProduct;