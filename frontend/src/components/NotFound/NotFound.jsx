import React from "react";
import { Link } from "react-router-dom";
import style from '../NotFound/notFound.module.css'

const NotFound = () => {

    return (
        <div className={style.bodyError}>
            <div className={style.divTitles}>
                <h2>404</h2>
                <div className={style.divTitle}>
                    <h1>¿Estás perdido?</h1>
                    <Link to='/home'>                    
                        <button className={style.btnError}>Vamos a casa</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;