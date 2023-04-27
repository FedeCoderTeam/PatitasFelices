import * as React from 'react';
import style from '../MyReviews/MyReviews.module.css'

const MyReviews = () => {
    return (
        <div className={style.main}>
            <h4>Aún no has hecho ningún comentario</h4>
            <img src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682482076/84807-not-found-alt_ejlqme.gif" alt="" />
        </div>
    )
}

export default MyReviews;