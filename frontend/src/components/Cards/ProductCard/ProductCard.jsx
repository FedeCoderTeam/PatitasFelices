import style from '../ProductCard/productCard.module.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({image, name, description, brand, price, id}) => {
    return(
  <>
    <div className={style.containerCards}>
            <div className={style.divImg}>
                <img className={style.img} src={image} alt="image not found" />
            </div>

         <div className={style.divInfo}>
                <div className={style.divData}>
                    <h5 className={style.title}>{name}</h5>
                    <h5 className={style.subTitle}>{brand}</h5>
                    <h5 className={style.price}>${price}<span className={style.priceSpan}>.00</span></h5>
                </div>
             <div className={style.divBtn}>
                    <Link to={`/products/${id}`}>
                        <button className={style.btnProduct}>Detalle</button>
                    </Link>
              </div>


          </div>
     </div>
    </>
    )
}

export default ProductCard;