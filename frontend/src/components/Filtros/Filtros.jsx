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
    const [temp, setTemp] = React.useState([]);
    const [color, setColor] = React.useState([])
    const [filter, setFilter] = React.useState({
        abc: "Por defecto",
        weigth: "Todos",
        size: "Todos",
        age: "Todos"
    })

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

    return(
        <div>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <Select multiple label='temperamentos' displayEmpty
            value={temp}
            onChange={handleTempChange}
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
                style={getStyles(name.id, temp, theme)}
                >
                {name.name}
                </MenuItem>
            ))}
            </Select>
            <Select multiple label='colors' displayEmpty
                value={color}
                onChange={handleColorChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em>Colores</em>;
                    }
                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                    <em>Colores</em>
                </MenuItem>
                {props.colors.map((name) => (
                    <MenuItem
                    key={name.id}
                    value={name.name}
                    style={getStyles(name.id, color, theme)}
                    >
                    {name.name}
                    </MenuItem>
                ))}
                </Select>
        </FormControl>

            
        </div>
    )
}

export default Filtros;