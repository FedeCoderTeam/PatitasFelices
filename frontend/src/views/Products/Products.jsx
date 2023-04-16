import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/Cards/ProductCard/ProductCard.jsx';
import * as productsAction from '../../_redux/actions/productsAction.js';
import PaginadoProducts from '../../components/Paginado/PaginadoProducts/PaginadoProducts.jsx';
import SearchProduct from "../../components/SearchBar/SearchProduct/SearchProduct.jsx";
import ProductFilters from '../../components/Filters/ProductFilters/ProductFilters.jsx';

const Products = () => {

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.productsReducer.allProducts)

    //----------------------------------------------PAGINADO-------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5)
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //-------------------------------------------------------------------------------------------------
    useEffect(() => {
        dispatch(productsAction.getProducts())
    }, [dispatch])

    return(
        <>
        <SearchProduct />
        <ProductFilters />
        <PaginadoProducts 
        productsPerPage={productsPerPage}
        allProducts={allProducts.length}
        paginado={paginado}
        />
        <div>
            {currentProducts?.map((e) => {
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