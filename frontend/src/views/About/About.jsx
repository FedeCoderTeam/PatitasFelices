import React from 'react';
import AboutImage from './images/AboutImage.jpg';
import style from './about.module.css';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';


const About = () => {
	const { t } = useTranslation();

    return (
        <div className={style.mainContainer}>
            <div className={style.title}>
                <h2>
                <Typewriter 
                    options={{
                        autoStart: true,
                        loop: true,
                        delay:200,
                        strings: ["Patitas Felices - Happy Paws"],
                        pauseFor: '5000ms'
                    }}
                />
                </h2>
            </div>
            <div className={style.description} data-aos="fade-down">
                <div className={style.containerStory}>
                <div>
                    <img src={AboutImage} alt="AboutImage" />
                </div>
                <p>{t('about.text')}</p>
                </div>
            </div>
        </div>
    )
}

export default About;
