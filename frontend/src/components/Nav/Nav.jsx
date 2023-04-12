import React from "react";
import { Link } from "react-router-dom";
import style from '../Nav/nav.module.css';


export default function Nav() {
    return(
        <div className={style.containerNav}>
            <div className={style.containerLeft}>
                <Link to="/home">
                    <p className={style.links}>Home</p>
                </Link>
                <Link to="/productos">
                    <p className={style.links}>Productos</p>
                </Link>
                <Link to="/perros">
                    <p className={style.links}>Perros</p>
                </Link>
            </div>
            <div className={style.containerRight}>
                <Link to="/login">
                    <p className={style.links}>Ingresar</p>
                </Link>
                <Link to="/register">
                    <p className={style.links}>Registrarse</p>
                </Link>
            </div>
        </div>
    )
}