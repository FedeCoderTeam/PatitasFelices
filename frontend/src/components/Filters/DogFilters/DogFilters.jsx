import React from 'react';
import style from './DogFilters.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterAction, setFilterAction, setPageAction, setSortAction, sortAction } from '../../../_redux/actions/dogsAction';
import { createTheme, InputLabel, ThemeProvider } from '@mui/material';
import { CustomMenuItem, CustomSelect } from './StyledDogFilters';
import Divider from '@mui/material/Divider';

const DogFilters = (props) => {
	const dispatch = useDispatch();

	const sortState = useSelector(state => state.dogsReducer.sort)
	const filterState = useSelector(state => state.dogsReducer.filter)

	const handleRefresh = () => {
		dispatch(setFilterAction('All', 'All', 'All', 'All'))
		dispatch(filterAction());
		dispatch(sortAction());
		dispatch(setPageAction(1))
	}

	const handleSort = (event) => {
		const { name, value } = event.target
		if(name === 'age') {
			dispatch(setSortAction(value, ''))
		}
		if(name === 'weight') {
			dispatch(setSortAction('', value))
		}
		dispatch(sortAction())
	}

	const handleFilter = (event) => {
		const { name, value } = event.target
		if(name === 'size') {
			dispatch(setFilterAction(value, null, null, null))
		} else if(name === 'color') {
			dispatch(setFilterAction(null, value, null, null))
		} else if(name === 'gender') {
			dispatch(setFilterAction(null, null, value, null))
		} else if(name === 'temperament') {
			dispatch(setFilterAction(null, null, null, value))
		}
		dispatch(filterAction());
		dispatch(sortAction());
		dispatch(setPageAction(1))
	}

	const theme = createTheme({
		palette: {
			primary: {
				main: 'rgba(202,146,93,0.39)'
			}
		},
	})

	return (
		<div className={style.main}>
			<form action="" className={style.formControl}>
				{/* <div className={style.searchBar}>
                    <SearchDog/>
                </div> */}

				<div className={style.ordenContainer}>
					<div className={style.orden}>Ordenar por</div>
					<div className={style.edad}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'sort-age-label'} sx={{color: '#999999'}} >Edad</InputLabel>
							<CustomSelect
								labelId={'sort-age-label'}
								name={'age'}
								value={sortState.age}
								onChange={handleSort}
								displayEmpty
								fullWidth
								age={sortState.age}
								MenuProps={{
									anchorOrigin: {
										vertical: "top",
										horizontal: "right"
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "left"
									},
									getContentAnchorEl: null
								}}
							>
								<CustomMenuItem disabled value={''}>Elegir orden</CustomMenuItem>
								<CustomMenuItem value={'asc'}>Menor a Mayor</CustomMenuItem>
								<CustomMenuItem value={'desc'}>Mayor a Menor</CustomMenuItem>
							</CustomSelect>
						</ThemeProvider>
					</div>

					<div className={style.peso}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'sort-weight-label'} sx={{color: '#999999'}} >Peso</InputLabel>
							<CustomSelect
								labelId={'sort-weight-label'}
								name={'weight'}
								value={sortState.weight}
								onChange={handleSort}
								displayEmpty
								fullWidth
								weight={sortState.weight}
								MenuProps={{
									anchorOrigin: {
										vertical: "top",
										horizontal: "right"
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "left"
									},
									getContentAnchorEl: null
								}}
							>
								<CustomMenuItem disabled value={''}>Elegir orden</CustomMenuItem>
								<CustomMenuItem value={'asc'}>Más liviano a más pesado</CustomMenuItem>
								<CustomMenuItem value={'desc'}>Más pesado a más liviano</CustomMenuItem>
							</CustomSelect>
						</ThemeProvider>
					</div>
				</div>
				<Divider sx={{width: '100%', backgroundColor: '#fff'}} />
				<div className={style.filtroContainer}>
					<div className={style.filtro}>Filtrar por</div>
					<div className={style.tamaño}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'filter-size-label'} sx={{color: '#999999'}} >Tamaño</InputLabel>
							<CustomSelect
								labelId={'filter-size-label'}
								name={'size'}
								value={filterState.size}
								onChange={handleFilter}
								fullWidth
								size={filterState.size}
								MenuProps={{
									anchorOrigin: {
										vertical: "top",
										horizontal: "right"
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "left"
									},
									getContentAnchorEl: null
								}}
							>
								<CustomMenuItem value={'All'}>Todos</CustomMenuItem>
								<CustomMenuItem value={'Giant'}>Gigante</CustomMenuItem>
								<CustomMenuItem value={'Large'}>Grande</CustomMenuItem>
								<CustomMenuItem value={'Medium'}>Mediano</CustomMenuItem>
								<CustomMenuItem value={'Small'}>Pequeño</CustomMenuItem>
								<CustomMenuItem value={'Mini'}>Muy Pequeño</CustomMenuItem>
							</CustomSelect>
						</ThemeProvider>
					</div>

					<div className={style.color}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'filter-color-label'} sx={{color: '#999999'}} >Color</InputLabel>
							<CustomSelect
								labelId={'filter-color-label'}
								name={'color'}
								value={filterState.color}
								onChange={handleFilter}
								fullWidth
								colorProps={filterState.color}
								MenuProps={{
									anchorOrigin: {
										vertical: "top",
										horizontal: "right"
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "left"
									},
									getContentAnchorEl: null
								}}
							>
								<CustomMenuItem value={'All'}>Todos</CustomMenuItem>
								{props.colors.map(color => (
									<CustomMenuItem key={color.id} value={color.name}>
										{color.name}
									</CustomMenuItem>
								))}
							</CustomSelect>
						</ThemeProvider>
					</div>

					<div className={style.temperamento}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'filter-temperament-label'} sx={{color: '#999999'}} >Temperamento</InputLabel>
							<CustomSelect
								labelId={'filter-temperament-label'}
								name={'temperament'}
								value={filterState.temperament}
								onChange={handleFilter}
								fullWidth
								temperament={filterState.temperament}
								MenuProps={{
									anchorOrigin: {
										vertical: "top",
										horizontal: "right"
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "left"
									},
									getContentAnchorEl: null
								}}
							>
								<CustomMenuItem value={'All'}>Todos</CustomMenuItem>
								{props.temperaments.map(temp => (
									<CustomMenuItem key={temp.id} value={temp.name}>
										{temp.name}
									</CustomMenuItem>
								))}
							</CustomSelect>
						</ThemeProvider>
					</div>
					<div className={style.gender}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'filter-gender-label'} sx={{color: '#999999'}} >Género</InputLabel>
							<CustomSelect
								labelId={'filter-gender-label'}
								name={'gender'}
								value={filterState.gender}
								gender={filterState.gender}
								onChange={handleFilter}
								fullWidth
								MenuProps={{
									anchorOrigin: {
										vertical: "top",
										horizontal: "right"
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "left"
									},
									getContentAnchorEl: null
								}}
							>
								<CustomMenuItem value={'All'}>Todos</CustomMenuItem>
								{props.genders.map(gender => (
									<CustomMenuItem key={gender.id} value={gender.name}>
										{gender.name}
									</CustomMenuItem>
								))}
							</CustomSelect>
						</ThemeProvider>
					</div>
				</div>

					<button
						className={style.btnProduct}
						type={'button'}
						onClick={handleRefresh}
					>REINICIAR FILTROS</button>
			</form>
		</div>
	);
};
export default DogFilters;
