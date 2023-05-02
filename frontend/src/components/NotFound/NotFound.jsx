import React from "react";
import { Link } from "react-router-dom";
import style from '../NotFound/notFound.module.css';
import { useTranslation } from 'react-i18next';


const NotFound = () => {
	
    const { t } = useTranslation();
    return (
        <div className={style.bodyError}>
            <div className={style.divTitles}>
                <h2 className={style.h2}>404</h2>
                <div className={style.divTitle}>
                    <h1 className={style.h1}>{t('e404.lost')}</h1>
                    <Link to='/home'>                    
                        <button className={style.btnError}>{t('e404.home')}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;