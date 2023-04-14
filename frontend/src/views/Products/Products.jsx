import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/Cards/ProductCard/ProductCard.jsx';
import * as productsAction from '../../_redux/actions/productsAction.js';

const Products = () => {

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.productsReducer.allProducts)


    useEffect(() => {
        dispatch(productsAction.getProducts())
    }, [dispatch])

    return(
        <>
        <TextField id="filled-basic" label="Buscar..." variant="filled" />
        <div>
            {allProducts?.map((e) => {
                return(
                    <ProductCard 
                    key={e.id}
                    id={e.id}
                    image={e.image}
                    name={e.name}
                    brand={e.brand}
                    description={e.description}
                    price={e.price}
                    />
                )
            })}
        </div>
        </>
    )
}

export default Products;