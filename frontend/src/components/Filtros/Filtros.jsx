import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
            } = event;
            setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            );
        };


    return(
        <div>

            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            
            <Select
            multiple
            label='temperamentos'
            displayEmpty
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                return <em>Todos</em>;
                }

                return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem disabled value="">
                <em>Temperamentos</em>
            </MenuItem>
            {props.temperaments.map((name) => (
                <MenuItem
                key={name.id}
                value={name.name}
                style={getStyles(name.id, personName, theme)}
                >
                {name.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

            <select>
                <option value="Todos"> Colores </option>
            </select>
            <select></select>
            <select></select>
            <select></select>
        </div>
    )
}

export default Filtros;