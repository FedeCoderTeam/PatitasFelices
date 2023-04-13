import * as React from 'react';
import { Link } from 'react-router-dom';


const DogCard = ({image, name, age, gender, size, id/* para detail */}) => {

    //puede ir aca la funcion para manejar el borrar card
    
    return(
        <>
            <div>
                <div>
                    <img src={image} alt='image not found' />
                </div>
                <div>
                    <h5>{name}</h5>
                    <h5>{age}</h5>
                    <h5>{gender}</h5>
                    <h5>{size}</h5>
                </div>
                <div>
                    <Link>
                        <button>Detalle</button>    
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DogCard;