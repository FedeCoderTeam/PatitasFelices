import React from "react";
import { Link } from 'react-router-dom';
import * as productsAction from '../../_redux/actions/productsAction';
import { useDispatch } from "react-redux";

const ViewB = () => {

    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(productsAction.getProductsById(4))
    }

    return (
        <div>
            <section className="containerBtns-ViewB">
                <div>
                 <Link to='./createProductForm'>
                        <button>a</button>
                    </Link>
                    <Link to='./CreateDog'><button>Crear Perro</button></Link>
                    <Link to='./updateDog'><button>Editar Perro</button></Link>
                    <Link to='./updateProduct'><button onClick={handleClick}>Editar Producto</button></Link>
                </div>
            </section>
        </div>
    )
}

export default ViewB

