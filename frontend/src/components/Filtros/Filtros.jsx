import React from 'react';
import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import SearchDog from '../SearchBar/SearchDog/SearchDog';
import style from './filtros.module.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    };
}

const Filtros = (props) => {
    
    const theme = useTheme();
    const [temp, setTemp] = React.useState([]);
    const [color, setColor] = React.useState([])

    const handleTempChange = (event) => {
        const {
            target: { value },
            } = event;
            setTemp(
            typeof value === 'string' ? value.split(',') : value,
            );
        };

    const handleColorChange = (event) => {
        const {
            target: { value },
            } = event;
            setColor(
            typeof value === 'string' ? value.split(',') : value,
            );
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
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>

                    <div className={style.color}>
                        <div>Color</div>
                        <select name="" id="" value={color} onChange={handleColorChange}>
                            <option value=""></option>
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
                        <select name="" id="" value={temp} onChange={handleTempChange}>
                            <option value=""></option>
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
                </div>

            </form>
        </div>
    )
}

export default Filtros;