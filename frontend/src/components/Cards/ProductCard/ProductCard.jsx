import * as React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({image, name, description, price, id}) => {
    return(
        <>
            <div>
                <img src={image} alt="image not found" />
            </div>
            <div>
                <h5>{name}</h5>
                <h5>{description}</h5>
                <h5>{price}</h5>
                
            </div>
            <div>
                <Link>
                    <button>Agregar</button>
                </Link>
            </div>
        </>
    )
}

export default ProductCard;