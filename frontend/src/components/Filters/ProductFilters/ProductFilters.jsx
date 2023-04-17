import React from 'react';
import style from './ProductFilters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import * as productsAction from "../../../_redux/actions/productsAction.js"; 
import SearchProduct from '../../SearchBar/SearchProduct/SearchProduct';

const ProductFilters = () => {

    const dispatch = useDispatch();
    const setCategory = useSelector((state) => state.productsReducer.setCategory)
    const setSubCategory = useSelector((state) => state.productsReducer.setSubCategory)
    
    const handleCategory = (event) => {
        dispatch(productsAction.setFilter({
            setCategory: event.target.value
        }))
        dispatch(productsAction.filter())
    }

    const handleSubCategory = (event) => {
        dispatch(productsAction.setFilter({
            setSubCategory: event.target.value
        }))
        dispatch(productsAction.filter())
    }


    return(
        <div className={style.main}>
            <form action="" className={style.formControl}>
                <div>
                    <SearchProduct />
                </div>
    
                <div className={style.ordenContainer}>
                    <div className={style.orden}>Ordenar por</div>
                    <div className={style.precio}>
                        <div>Precio</div>
                        <select name="" id="">
                            <option value="">-</option>
                            <option value="menor">Menor Precio</option>
                            <option value="mayor">Mayor Precio</option>
                        </select>
                    </div>
    
                    <div className={style.abc}>
                        <div>A-Z</div>
                        <select name="" id="">
                            <option value="">-</option>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                </div>
    
                <div className={style.filtroContainer}>
                    <div className={style.filtro}>Filtrar por</div>
                    <div className={style.categoria}>
                        <div>Categoria</div>
                        <select name="" id="" 
                            value={setCategory} 
                            onChange={(event) => {
                                handleCategory(event);
                            }}>
                            <option value="All">Todos</option>
                            <option value="Alimentos">Alimentos</option>
                            <option value="Accesorios">Accesorios</option>
                        </select>
                    </div>
                    <div className={style.subCategoria}>
                        <div>Subcategoria</div>
                        <select name="" id="" 
                            value={setSubCategory} 
                            onChange={(event) => {
                                handleSubCategory(event);
                            }}>
                            <option value="All">Todos</option>
                            <option value="adulto">Adulto</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="comederos">Comederos</option>
                            <option value="collares">Collares</option>
                            <option value="juguetes">Juguetes</option>
                            <option value="vestimenta">Vestimenta</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductFilters;