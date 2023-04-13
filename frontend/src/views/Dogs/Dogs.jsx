import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import Filtros from '../../components/Filtros/Filtros.jsx';
import DogCard from '../../components/dogCard/dogCard.jsx';


const Dogs = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.dogsReducer.temperaments)
    const selector1 = useSelector((state) => state.dogsReducer.colors)
    const allDogs = useSelector((state) => state.dogsReducer.allDogs)

    //----------------------------------------PAGINADO---------------------------------------------------------------
    
    //---------------------------------------------------------------------------------------------------------------

    useEffect(() => {
            dispatch(dogsAction.getDogs())
            dispatch(dogsAction.getTemperaments())
            
        },[dispatch])

    
        
    return(
        <>
            {/* <TextField id="outlined-basic" label="Buscar..." variant="outlined" /> */}
            {/* <TextField id="standard-basic" label="Buscar..." variant="standard" /> */}
            <TextField id="filled-basic" label="Buscar..." variant="filled" />
            <Filtros temperaments={selector} colors={selector1} />
            <div>
            {allDogs?.map((e) => {
                return(
                    <DogCard
                    key={e.id}
                    id={e.id}
                    image={e.image}
                    name={e.name}
                    age={e.age}
                    gender={e.gender}
                    size={e.size}
                    />
                )
            })}
            </div>
        </>
    )
}

export default Dogs;