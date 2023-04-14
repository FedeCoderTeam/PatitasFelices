import React from 'react';

const PaginadoProducts = ({ productsPerPage, allProducts, paginado }) => {

    let pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allProducts/productsPerPage) -1 ; i++) {
        pageNumbers.push(i+1)
    }
    return(
        <>
            <nav>
                <ul>
                    {pageNumbers?.map((number) => (
                            <li onClick={() => paginado(number)} key={number}>{number}</li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default PaginadoProducts;