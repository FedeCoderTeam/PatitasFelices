import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import Filtros from '../../components/Filtros/Filtros.jsx';
import DogCard from '../../components/Cards/DogCard/DogCard.jsx';
import PaginadoDogs from '../../components/Paginado/PaginadoDogs/PaginadoDogs.jsx';


const Dogs = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.dogsReducer.temperaments)
    const selector1 = useSelector((state) => state.dogsReducer.colors)
    const allDogs = useSelector((state) => state.dogsReducer.allDogs)

    //----------------------------------------PAGINADO---------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(7);
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //---------------------------------------------------------------------------------------------------------------

    useEffect(() => {
            dispatch(dogsAction.getDogs())
            dispatch(dogsAction.getTemperaments())
            
        },[dispatch])

    
        
    return(
        <>
            <TextField id="filled-basic" label="Buscar..." variant="filled" />
            <Filtros temperaments={selector} colors={selector1} />
            <PaginadoDogs 
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            />
            <div>
            {currentDogs?.map((e) => {
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