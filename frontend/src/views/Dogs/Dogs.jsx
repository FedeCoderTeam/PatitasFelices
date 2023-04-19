import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as dogsAction from "../../_redux/actions/dogsAction.js"
import DogFilters from '../../components/Filters/DogFilters/DogFilters.jsx';
import DogCard from '../../components/Cards/DogCard/DogCard.jsx';
import PaginatedDogs from '../../components/Paginated/PaginatedDogs/PaginatedDogs.jsx';
import style from './dogs.module.css';

const Dogs = () => {

	let prueba = useSelector((state)=> state.dogsReducer.maybeAdoptedDog)
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
	const paginado = (pageNumber) => {
		dispatch(dogsAction.setPage(pageNumber));
	};
	//---------------------------------------------------------------------------------------------------------------

	useEffect(() => {
		setCurrentDogs(allDogs?.slice(range.firts, range.last));
        setRange({
            firts: (currentPage - 1) * dogsPerPage,
            last: currentPage * dogsPerPage,
        });
    }, [dispatch, allDogs, range.firts, range.last, currentPage, dogsPerPage]);
    
        
    return(
        <div data-aos="fade-down" className={style.main}>
            <div className={style.filtersContainer}>
                <DogFilters
                    allDogs={allDogs}
                    temperaments={temperaments} 
                    colors={colors} 
                    gender={gender}
                />
            </div>

			<div className={style.cardSection}>
				<div className={style.paginatedContainer}>
					<PaginatedDogs
						dogsPerPage={dogsPerPage}
						allDogs={allDogs?.length}
						paginado={paginado}
						currentPage={currentPage}
					/>
				</div>

				{!currentDogs.length ? (
					<h2>No hay ningun perro con las características seleccionadas</h2>
				) : (
					<div className={style.cardsContainer}>
						{currentDogs?.map((e) => {
							return (
								<DogCard
									key={e.id}
									id={e.id}
									image={e.image}
									name={e.name}
									age={e.age}
									gender={e.gender}
									size={e.size}
									temperaments={e.temperaments}
									description={e.description}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dogs;