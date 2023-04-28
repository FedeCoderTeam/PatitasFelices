import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as dogsAction from '../../_redux/actions/dogsAction.js';
import DogFilters from '../../components/Filters/DogFilters/DogFilters.jsx';
import DogCard from '../../components/Cards/DogCard/DogCard.jsx';
import PaginatedDogs from '../../components/Paginated/PaginatedDogs/PaginatedDogs.jsx';
import style from './dogs.module.css';

const Dogs = () => {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogsReducer.dogs);
	const temperaments = useSelector((state) => state.dogsReducer.temperaments);
	const colors = useSelector((state) => state.dogsReducer.colors);
	const gender = useSelector((state) => state.dogsReducer.genders);
	let currentPage = useSelector((state) => state.dogsReducer.currentPage);

	//----------------------------------------PAGINADO---------------------------------------------------------------
	const [dogsPerPage] = useState(7);
	const [range, setRange] = useState({ firts: 0, last: 7 });
	const [currentDogs, setCurrentDogs] = useState(
		allDogs.slice(range.firts, range.last),
	);
	const [isLoading, setIsLoading] = useState(true);
	const paginado = (pageNumber) => {
		dispatch(dogsAction.setPage(pageNumber));
	};
	//---------------------------------------------------------------------------------------------------------------

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		setCurrentDogs(allDogs?.slice(range.firts, range.last));
		setRange({
			firts: (currentPage - 1) * dogsPerPage,
			last: currentPage * dogsPerPage,
		});
	}, [dispatch, allDogs, range.firts, range.last, currentPage, dogsPerPage]);

	return (
		<div data-aos="fade-down" className={style.main}>
			{isLoading ? (
				<div className={style.loaderContainer}>
					<img
						className={style.loader}
						src="https://res.cloudinary.com/dreso9ye9/image/upload/v1681877316/Proyecto%20Final/127157-moody-dog_1_w3qyr5.gif"
						alt="Cargando..."
					/>
				</div>
			) : (
			<>
			<div className={style.filtersBox}>
				<div className={style.filtersContainer}>
					<DogFilters
						allDogs={allDogs}
						temperaments={temperaments}
						colors={colors}
						gender={gender}
					/>
				</div>
			</div>

			<div className={style.cardSection} data-aos="fade-down">
				{!currentDogs.length ? (
					''
				) : (
					<div className={style.paginatedContainer}>
						<PaginatedDogs
							dogsPerPage={dogsPerPage}
							allDogs={allDogs?.length}
							paginado={paginado}
							currentPage={currentPage}
						/>
					</div>
				)}

				{!currentDogs.length ? (
					<h2>No hay ningun perro con las características seleccionadas</h2>
				) : (
					<div className={style.cardsContainer}>
						{currentDogs?.map((e) => {
							return (e.isDisabled === false && e.adopted === false)
							&& 	<DogCard
									key={e.id}
									id={e.id}
									image={e.image}
									name={e.name}
									age={e.age}
									gender={e.gender}
									size={e.size}
									temperaments={e.temperaments}
									description={e.description}
									colors={e.colors}
									weight={e.weight}
								/>
						})}
					</div>
				)}
			</div>
			</>
			)}
		</div>
	);
};

export default Dogs;
