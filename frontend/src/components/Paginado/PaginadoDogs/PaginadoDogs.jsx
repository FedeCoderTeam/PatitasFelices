import React from 'react';

const PaginadoDogs = ({ dogsPerPage, allDogs, paginado }) => {

    let pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allDogs/dogsPerPage) -1 ; i++) {
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

export default PaginadoDogs;