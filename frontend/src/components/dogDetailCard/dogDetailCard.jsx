import * as React from "react";
import { Link } from 'react-router-dom';



const dogCardDetail = ({id, name, age, size, weight, image, description,color, gender, temperament}) => {

    return (
        <div className="dogCardDetail">
            <img src={image} alt= "dog image not found"/> 
            <div className="dogDescription">
                <p>Description: {description}</p>
            </div>
            <div className="dogDetail">
                <h2>{name}</h2>
                <h3>ID: {id}</h3>
                <p>Meses: {age}</p>
                <p>Tamaño: {size}</p>
                <p>Peso: {weight}</p>
                <p>Color: {color}</p>
                <p>Genero: {gender}</p>
                <p>Temperamento: {temperament}</p>
            </div>
            <Link to = {`/form`}>
                <button>Completar Formulario de Adopción</button>    
            </Link>
        </div>
    )
}

export default dogCardDetail;