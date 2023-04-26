import React from "react";
import { Link } from "react-router-dom";
import style from '../Landing/landing.module.css'
import {useTranslation} from 'react-i18next';

const Landing = () => {
    const { t } = useTranslation()
    return (
        <div className={style.bodyLanding}>
            <div className={style.divLanding}>
                <h1 className={style.titleLanding}>{t('landing.welcomeTo')} <span className={style.spanLanding}>{t('landing.happyPaws')}</span></h1>
                <Link to='/home'>
                    <button className={style.btnLanding}>{t('landing.join')}</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;