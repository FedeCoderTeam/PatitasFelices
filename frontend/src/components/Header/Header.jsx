import React from "react";
import { Link } from "react-router-dom";
import style from "../Header/header.module.css";


export default function Header() {
    return(
    <div className = {style.mainContainer} data-aos="fade-down"
    data-aos-anchor-placement="center-bottom">

        <div className={style.container}>

            <div className = {style.title}>
                <h1>Un poco sobre</h1><h1 className = {style.patitasFelices}>nosotros</h1>
            </div>

            <div className = {style.description}>
                <p>Patitas Felices es un refugio para perros que han sido abandonados o que han sufrido algún tipo de maltrato. Les proveemos de atención médica, alimento y un lugar mientras se busca un hogar permanente para cada uno de ellos. </p>
            </div>

            <div className = {style.buttonContainer}>
                <Link to='/dogs'>
                    <button className = {style.button}>Conócelos</button>
                </Link>
                
            </div>

        </div>

    </div>)
}