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
import HomeReviewSection from '../../components/HomeSection/HomeReviewSection/HomeReviewSection';
import {useTranslation} from 'react-i18next';




const Home = () => {
    //navbar
    //header
    //cards
    // const [dogsPerPage] = useState(7);
    const { t } = useTranslation()

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
                        <h1>{t('home.section.dog.our')} <span>{t('home.section.dog.rescues')}</span></h1>
                        <h4>{t('home.section.dog.text1')}</h4>
                        <h3>{t('home.section.dog.text2')}</h3>
                        <div>
                            <Link to='/dogs'><button className='button'>{t('home.section.dog.meetThemAll')}</button></Link>
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

                <div data-aos="fade-down" data-aos-duration="1000">
                    <HomeReviewSection/>
                </div>
            </div>
        </>
    )
}

export default Home;
