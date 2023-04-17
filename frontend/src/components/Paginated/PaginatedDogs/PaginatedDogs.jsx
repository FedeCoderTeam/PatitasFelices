import React from 'react';
import style from './paginatedDogs.module.css';
import {Pagination, Stack} from '@mui/material';

const PaginatedDogs = ({ dogsPerPage, allDogs, paginado, currentPage }) => {
	let pageNumbers = [];

	for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
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
			{/*<nav>*/}
			{/*	<ul className={style.numbersList}>*/}
			{/*		{pageNumbers?.map((number) => (*/}
			{/*			<li*/}
			{/*				className={style.number}*/}
			{/*				onClick={() => paginado(number)}*/}
			{/*				key={number}*/}
			{/*			>*/}
			{/*				{number}*/}
			{/*			</li>*/}
			{/*		))}*/}
			{/*	</ul>*/}
			{/*</nav>*/}
		</>
	);
};

export default PaginatedDogs;
