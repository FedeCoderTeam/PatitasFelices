import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './dogCard.module.css';
import animals from './img/animals.png';
import bone from './img/bone.png';
import gorDetailCard from '../dogDetailCard/dogDetailCard.jsx';
import { useState } from 'react';



const DogCard = ({image, name, age, gender, size, temperaments, id/* para detail */}) => {

    //puede ir aca la funcion para manejar el borrar card

    // const favoriteIcon = document.querySelector('.card .favorite-icon');

    // favoriteIcon.addEventListener('click', function() {
    //   // agregar dog favorito
    // });
    const [showDetailCard, setShowDetailCard] = useState(false);

    const handleShowDetailCard = () => {
        setShowDetailCard (!showDetailCard);
    }
    

    return(
        <>
            <div className={style.containerCard}>
                <div className={style.containerIcon}>
                    <img className={style.Icon} src= {animals} alt='Icono-Favorito'/>
                </div>
                <div className={style.containerImg}>
                    <img className={style.img} src={image} alt='Foto-perrito' />
                </div>
                <div className={style.divDogInfo}>
                    <div className={style.divData}>
                        <h5 className={style.itemName}>
                            <img className={style.itemIcon} src={bone}/>
                        {name}
                        </h5>
                        <h5 className={style.itemTemp}>
                            <img className={style.itemIcon} src={bone}/>
                        {temperaments}
                        </h5>
                        <h5 className={style.intemAge}>
                            <img className={style.itemIcon} src={bone}/>{age}
                        </h5>
                        <h5 className={style.intemGender}>
                            <img className={style.itemIcon} src={bone}/>{gender}
                        </h5>
                        <h5 className={style.intemSize}>
                            <img className={style.itemIcon} src={bone}/>{size}
                        </h5> 
                    </div>   
                </div> 
                <div className={style.containerButton}>
                        <Link to = '/dogCardDetail'>
                            <button className={style.button} onClick= {handleShowDetailCard}>Ver más información</button>    
                        </Link>
                </div>
            </div>
        </>
    )
}

export default DogCard;