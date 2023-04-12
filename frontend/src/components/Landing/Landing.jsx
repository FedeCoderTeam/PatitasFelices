import React from "react";
import { Link } from "react-router-dom";
import style from '../Landing/landing.module.css'

const Landing = () => {
    return (
        <div className={style.bodyLanding}>
            <div className={style.divLanding}>
                <h1 className={style.titleLanding}>¡Bienvenidos a <span className={style.spanLanding}>Patitas Felices!</span></h1>
                <Link to='/home'>
                    <button className={style.btnLanding}>INGRESAR</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;