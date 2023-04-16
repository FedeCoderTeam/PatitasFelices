import React from 'react';
import SearchDog from '../../SearchBar/SearchDog/SearchDog';
import style from './DogFilters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import * as dogsAction from "../../../_redux/actions/dogsAction.js";

const DogFilters = (props) => {
    
    const dispatch = useDispatch();
    const setTemp = useSelector((state) => state.dogsReducer.setTemperaments)
    const setColor = useSelector((state) => state.dogsReducer.setColor)
    const setSize = useSelector((state) => state.dogsReducer.setSize)
    const setGender = useSelector((state) => state.dogsReducer.setGender)
    
    const handleColor = (event) => {
        dispatch(dogsAction.setFilter({
            setColor: event.target.value
        }))
        dispatch(dogsAction.filter())
    }
    
    const handleTemperaments = (event) => {
        dispatch(dogsAction.setFilter({
            setTemperaments: event.target.value
        }))
        dispatch(dogsAction.filter())
    }
    
    const handleSize = (event) => {
        dispatch(dogsAction.setFilter({
            setSize: event.target.value
        }))
        dispatch(dogsAction.filter())
    }

    const handleGender = (event) => {
        dispatch(dogsAction.setFilter({
            setGender: event.target.value
        }))
        dispatch(dogsAction.filter())
    }
    
    return (
        <div className={style.main}>
            <form action="" className={style.formControl}>
                <div className={style.searchBar}>
                    <SearchDog/>
                </div>
    
                <div className={style.ordenContainer}>
                    <div className={style.orden}>Ordenar por</div>
                    <div className={style.edad}>
                        <div>Edad</div>
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
    
                    <div className={style.peso}>
                        <div>Peso</div>
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
    
                <div className={style.filtroContainer}>
                    <div className={style.filtro}>Filtrar por</div>
                    <div className={style.tamaño}>
                        <div>Tamaño</div>
                        <select name="" id=""
                        value={setSize}
                        onChange={(event) => {
                            handleSize(event);
                        }}
                        >
                            <option value="All"></option>
                            <option value="Giant">Gigante</option>
                            <option value="Large">Grande</option>
                            <option value="Medium">Mediano</option>
                            <option value="Small">Pequeño</option>
                            <option value="Mini">Muy Pequeño</option>
                        </select>
                    </div>
    
                    <div className={style.color}>
                        <div>Color</div>
                        <select name="" id="" 
                            value={setColor} 
                            onChange={(event) => {
                                handleColor(event);
                            }}>
                            <option value="All">Todos</option>
                            {props.colors.map((name) => (
                                    <option
                                    key={name.id}
                                    value={name.name}
                                    // style={getStyles(name.id, color, theme)}
                                    >
                                    {name.name}
                                    </option>
                                ))}
                        </select>
                    </div>
    
                    <div className={style.temperamento}>
                        <div>Temperamento</div>
                        <select name="" id="" 
                            value={setTemp} 
                            onChange={(event) => {
                                handleTemperaments(event);
                            }}>
                            <option value="All">Todos</option>
                            {props.temperaments.map((name) => (
                                <option
                                key={name.id}
                                value={name.name}
                                // style={getStyles(name.id, temp, theme)}
                                >
                                {name.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.gender}>
                        <div>Genero</div>
                        <select name="" id="" 
                            value={setGender} 
                            onChange={(event) => {
                                handleGender(event);
                            }}>
                            <option value="All">Todos</option>
                            {props.gender.map((name) => (
                                <option
                                key={name.id}
                                value={name.name}
                                >
                                {name.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
    }

export default DogFilters;