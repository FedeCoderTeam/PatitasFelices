import styled from 'styled-components'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const CustomSelect = styled(Select)`
  color: #f2f2f2;
  margin-top: 2px;
  margin-bottom: 5px;
  .MuiSelect-icon {
    color: #f2f2f2
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => (props.age !== '' && props.weight !== '' && props.size !== 'All' && props.colorProps !== 'All' && props.temperament !== 'All' && props.gender !== 'All') ? `rgba(202,146,93,0.39)` : `` }
  }
  &:hover {
    background-color: rgba(70, 70, 70, 0.308);
    transition: background-color 0.1s linear;
  }
  &:hover fieldset {
    border-color: rgba(202,146,93,0.39) !important;
  }
`
const CustomMenuItem  = styled(MenuItem)`
    &.MuiMenuItem-root {
        transition: 0.06s all linear;
        &:hover {
            background-color: rgba(199, 145, 93, 0.75);				
        }
    }
    &.Mui-selected:not(:first-child) {
        background-color: rgba(199, 145, 93, 0.5);
        transition: 0.06s all linear;

        &:hover {
            background-color: rgba(199, 145, 93, 0.75);
        }
    }
`

export { CustomSelect, CustomMenuItem }