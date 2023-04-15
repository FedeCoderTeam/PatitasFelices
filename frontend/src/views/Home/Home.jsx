import * as React from 'react';
import Header from '../../components/Header/Header';
import HomeDogSection from '../../components/HomeDogSection/HomeDogSection';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import './Home.css';
import { Link } from 'react-router-dom';



const Home = () => {
    //navbar
    //header
    //cards
    // const [dogsPerPage] = useState(7);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(dogsAction.getDogs())
        dispatch(dogsAction.getTemperaments())
    }, [dispatch])
    const allDogs = useSelector((state) => state.dogsReducer.allDogs)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(3);
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    return (
        <>
            <Header />
            <div className='mainContainerCardsHDS-Home'>
                    <h1 data-aos="fade-down"
    data-aos-duration="1000">Aquí algunos de nuestros <span>pequeños</span></h1>
                <div className='containerCardsHDS-Home'>
                    {currentDogs?.map((e) => {
                        return (
                            <HomeDogSection
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
                <div>
                    <button><Link to='/dogs'>¡Conócelos a todos!</Link></button>
                </div>
            </div>
        </>
    )
}

export default Home;