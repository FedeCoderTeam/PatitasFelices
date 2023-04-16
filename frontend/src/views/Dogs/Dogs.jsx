import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import DogFilters from '../../components/Filters/DogFilters/DogFilters.jsx';
import DogCard from '../../components/Cards/DogCard/DogCard.jsx';
import PaginadoDogs from '../../components/Paginado/PaginadoDogs/PaginadoDogs.jsx';
import style from './dogs.module.css'
import SearchDog from '../../components/SearchBar/SearchDog/SearchDog.jsx';


const Dogs = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.dogsReducer.temperaments)
    const colors = useSelector((state) => state.dogsReducer.colors)
    const allDogs = useSelector((state) => state.dogsReducer.dogs)
    const gender = useSelector((state) => state.dogsReducer.genders)

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
            dispatch(dogsAction.getDogsColors())
            dispatch(dogsAction.genders())
        },[dispatch])

    
        
    return(
        <div className={style.main}>
            <div className={style.filtersContainer}>
                <DogFilters 
                    temperaments={temperaments} 
                    colors={colors} 
                    gender={gender}
                />
            </div>

            <div className={style.cardSection}>
                <div className={style.paginatedContainer}>
                    <PaginadoDogs 
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}

                    />
                </div>
                
                <div className={style.cardsContainer}>
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
                        temperaments={e.temperaments}
                        />
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Dogs;