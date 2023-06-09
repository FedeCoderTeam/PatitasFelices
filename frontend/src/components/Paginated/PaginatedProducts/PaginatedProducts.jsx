import React from 'react';
import style from './paginatedProducts.module.css';
import {Pagination, Stack} from '@mui/material';

const PaginatedProducts = ({
	productsPerPage,
	allProducts,
	paginado,
	currentPage,
}) => {
	let pageNumbers = [];

	for (let i = 0; i <= Math.ceil(allProducts / productsPerPage) - 1; i++) {
		pageNumbers.push(i + 1);
	}
	const handleOnChangePage = (event, value) => {
		paginado(value)
	}
	return (
		<>

			<div className={style.box}>
				<Stack spacing={1}>
					<Pagination count={pageNumbers.length} shape="rounded" page={currentPage} onChange={handleOnChangePage}/>
				</Stack>
			</div>
			{/* <nav>
				<ul className={style.numbersList}>
					{pageNumbers?.map((number) => (
						<li 
						onClick={() => paginado(number)} 
						key={number}
						className={style.number}
						>

							{number}
						</li>
					))}
				</ul>
			</nav> */}
		</>
	);
};

export default PaginatedProducts;
