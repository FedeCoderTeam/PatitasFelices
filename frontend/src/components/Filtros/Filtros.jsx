import React from 'react';
import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import SearchDog from '../SearchBar/SearchDog/SearchDog';
import style from './filtros.module.css'
import { useSelector, useDispatch } from 'react-redux';
import * as dogsAction from "../../_redux/actions/dogsAction.js";


/* const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}; */

/* function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    };
} */

const Filtros = (props) => {
    
    const dispatch = useDispatch();
    /* const theme = useTheme(); */
    const setTemp = useSelector((state) => state.dogsReducer.setTemperaments)
    const setColor = useSelector((state) => state.dogsReducer.setColor)
    const setSize = useSelector((state) => state.dogsReducer.setSize)
    const setGender = useSelector((state) => state.dogsReducer.setGender)
    console.log(setTemp);
    console.log(setColor);
    console.log(setSize);
    console.log(setGender);
    
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
//     return(
//         <div>
//             <FormControl className={style.formControl} sx={{ m: 1, width: 300, mt: 3 }}>

//                 <div>
//                     <TextField id="filled-basic" label="Buscar..." variant="filled" />
//                 </div>

//                 <div>
//                     <Select multiple label='temperamentos' displayEmpty
//                     value={temp}
//                     onChange={handleTempChange}
//                     input={<OutlinedInput />}
//                     renderValue={(selected) => {
//                         if (selected.length === 0) {
//                         return <em>Todos</em>;
//                         }
//                         return selected.join(', ');
//                     }}
//                     MenuProps={MenuProps}
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     >
//                         <MenuItem disabled value="">
//                             <em>Temperamentos</em>
//                         </MenuItem>
//                         {props.temperaments.map((name) => (
//                             <MenuItem
//                             key={name.id}
//                             value={name.name}
//                             style={getStyles(name.id, temp, theme)}
//                             >
//                             {name.name}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </div>

//                 <div>
//                     <Select multiple label='colors' displayEmpty
//                         value={color}
//                         onChange={handleColorChange}
//                         input={<OutlinedInput />}
//                         renderValue={(selected) => {
//                             if (selected.length === 0) {
//                             return <em>Colores</em>;
//                             }
//                             return selected.join(', ');
//                         }}
//                         MenuProps={MenuProps}
//                         inputProps={{ 'aria-label': 'Without label' }}
//                         >
//                             <MenuItem disabled value="">
//                                 <em>Colores</em>
//                             </MenuItem>
//                             {props.colors.map((name) => (
//                                 <MenuItem
//                                 key={name.id}
//                                 value={name.name}
//                                 style={getStyles(name.id, color, theme)}
//                                 >
//                                 {name.name}
//                                 </MenuItem>
//                             ))}
//                     </Select>
//                 </div>
//             </FormControl>

            
//         </div>
//     )
// }


export default Filtros;