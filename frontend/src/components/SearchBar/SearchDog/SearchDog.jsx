import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as dogsAction from "../../../_redux/actions/dogsAction.js";
import style from './SearchDog.module.css'

const SearchDog = () => {
    const dispatch = useDispatch();
    let name = useSelector((state) => state.dogsReducer.name);

    const handlerSetName = (event) => {
        const regex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]*$/;
        if (regex.test(event) || event === "") {
            dispatch(dogsAction.setName({ name: event}));
        }
    };

    const handleGetName = () => {
        dispatch(dogsAction.getName());
        dispatch(dogsAction.setPageAction(1));
    };

    return(
        <>
            <div className={style.searchBar}>
                <input
                    className={style.input}
                    autoComplete="off"
                    type="text"
                    placeholder="Search..."
                    value={name}
                    onChange={(event) => {
                        handlerSetName(event.target.value);
                        handleGetName();
                    }}
                />
            </div>
        </>
    )
}

export default SearchDog;
