import * as React from "react";
import { Link } from 'react-router-dom';


const dogDetailCard = ({id, name, age, size, weight, image, description,color, gender, temperament}) => {
    let ageInYears = age >= 12 ? Math.round (age / 12) : age + " meses";
    return (
        <div className={style.dogCardDetail}>
            <div className= {style.divLeft}>
                <img className={style.img} src={image} alt= "dog image not found"/> 
                <div className="dogDescription">
                    <p>Description:{description} </p>
                </div>
            </div>
            <div className= {style.divRight}>
                <div className={style.dogDetail}>
                    <h2>{name}</h2>
                    <h3>ID: {id}</h3>
                    <p>Edad: {ageInYears}</p>
                    <p>Tamaño: {size}</p>
                    <p>Peso: {weight}</p>
                    <p>Color: {color}</p>
                    <p>Genero: {gender}</p>
                    <p>Temperamento: {temperament}</p>
                </div>
                <div className= {style.containerButton}>
                    <Link to = {`/form`}>
                        <button>Completar Formulario de Adopción</button>    
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default dogDetailCard