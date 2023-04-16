import React from 'react';
import style from './paginadoDogs.module.css';

const PaginadoDogs = ({ dogsPerPage, allDogs, paginado, currentPage }) => {
	let pageNumbers = [];

	for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
		pageNumbers.push(i + 1);
	}
	return (
		<>
			<nav>
				<ul className={style.numbersList}>
					{pageNumbers?.map((number) => (
						<li
							className={style.number}
							onClick={() => paginado(number)}
							key={number}
						>
							{number}
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default PaginadoDogs;
