import * as React from 'react';
import Header from '../../components/Header/Header';
import HomeDogSection from '../../components/HomeSection/HomeDogSection/HomeDogSection';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import './Home.css';
import { Link } from 'react-router-dom';
import HomeDonationSection from '../../components/HomeSection/HomeDonationSection/HomeDonationSection';
import HomeProductSection from '../../components/HomeSection/HomeProductSection/HomeProductSection.jsx';



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
            <div className='mainContainerCardsHDS-Home' data-aos="fade-down"
    data-aos-duration="1000">
                <div className='dogSectionContainer'>
                    <div className='dogSectionContainer-LeftSide'>
                        <h1>Nuestros <span>rescatados</span></h1>
                        <h4>Descubre las conmovedoras historias de nuestros pequeños valientes y encuentra tu compañero</h4>
                        <h3>¡Adopta a uno de nuestros perritos y cambia su vida para siempre!</h3>
                        <div>
                            <Link to='/dogs'><button className='button'>¡Conócelos a todos!</button></Link>
                        </div>
                    </div>
                    <div className='containerCardsHDS-Home'>
                        {/* {currentDogs?.map((e) => {
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
                        })} */}
                        <Link to='/dogs'>
                            <img src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681884590/91540-dog-love_b0o1tw.gif" alt="" className='dogSectionImage'/>
                        </Link>
                    </div>
                </div>
                
                <div className='sectionDonationProducts-Home' data-aos="fade-down" data-aos-duration="1000">
                    <HomeDonationSection />
                </div>

                <div data-aos="fade-down" data-aos-duration="1000">
                    <HomeProductSection />
                </div>
            </div>
        </>
    )
}

export default Home;