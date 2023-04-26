import React from "react";
import { Link } from "react-router-dom";
import style from "../Header/header.module.css";
import {useTranslation} from 'react-i18next';


export default function Header() {
    const { t } = useTranslation()
    return(
    <div className = {style.mainContainer} data-aos="fade-down"
    data-aos-anchor-placement="center-bottom">

        <div className={style.container}>

            <div className = {style.title}>
                <h1>{t('home.header.about')}</h1><h1 className = {style.patitasFelices}>{t('home.header.us')}</h1>
            </div>

            <div className = {style.description}>
                <p>{t('home.header.description')}</p>
            </div>

            <div className = {style.buttonContainer}>
                <Link to='/dogs'>
                    <button className = {style.button}>{t('home.header.discoverThem')}</button>
                </Link>
                
            </div>

        </div>

    </div>)
}