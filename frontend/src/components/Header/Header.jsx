import React from "react";
import { Link } from "react-router-dom";
import style from "../Header/header.module.css";


export default function Header() {
    return(
    <div className = {style.mainContainer}>

        <div className={style.container}>

            <div className = {style.title}>
                <h1>¡Bienvenido a</h1><h1 className = {style.patitasFelices}>Patitas Felices!</h1>
            </div>

            <div className = {style.description}>
                <p>Aquí podrás conocer a nuestros adorables perros en busca de un hogar. Descubre sus historias y cómo puedes ayudar. </p>
            </div>

            <div className = {style.buttonContainer}>
                <Link>
                    <button className = {style.button}>Conócelos</button>
                </Link>
                
            </div>

        </div>

    </div>)
}