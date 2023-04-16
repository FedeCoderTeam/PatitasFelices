import React from 'react';
import style from '../PaginadoProducts/paginadoProducts.module.css';

const PaginadoProducts = ({
	productsPerPage,
	allProducts,
	paginado,
	currentPage,
}) => {
	let pageNumbers = [];

	for (let i = 0; i <= Math.ceil(allProducts / productsPerPage) - 1; i++) {
		pageNumbers.push(i + 1);
	}
	return (
		<>
			<nav>
				<ul className={style.numbersList}>
					{pageNumbers?.map((number) => (
						<li className={style.number} onClick={() => paginado(number)} key={number}>
							{number}
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default PaginadoProducts;
