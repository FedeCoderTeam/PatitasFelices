import React from 'react';
import style from './ProductFilters.module.css';
import { useSelector, useDispatch } from 'react-redux';
import SearchProduct from '../../SearchBar/SearchProduct/SearchProduct';
import {
	filterAction,
	setFilterAction,
	setPageAction,
	setSortAction,
	sortAction
} from '../../../_redux/actions/productsAction';
import {createTheme, InputLabel, ThemeProvider} from '@mui/material';
import {CustomMenuItem, CustomSelect} from './StyledProductFilters';
import Divider from '@mui/material/Divider';

const ProductFilters = (props) => {
	const dispatch = useDispatch();

	const sortState = useSelector(state => state.productsReducer.sort)
	const filterState = useSelector(state => state.productsReducer.filter)

	const handleSort = (event) => {
		const { name, value } = event.target
		if(name === 'price') {
			dispatch(setSortAction(value, ''))
		} else if(name === 'name') {
			dispatch(setSortAction('', value))
		}
		dispatch(sortAction())
	}

	const handleFilter = (event) => {
		const { name, value } = event.target
		if(name === 'category') {
			dispatch(setFilterAction(value, 'All'))
		} else if(name === 'subCategory') {
			dispatch(setFilterAction(null, value))
		}
		dispatch(filterAction())
		dispatch(sortAction())
		dispatch(setPageAction(1))
	}

	const handleRefresh = () => {
		dispatch(setFilterAction('All', 'All'))
		dispatch(setSortAction('asc', ''))
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
				<div className={style.searchBar}>
					<SearchProduct />
				</div>
				<Divider sx={{width: '100%', height: '2px', backgroundColor: '#666666'}} />
				<div className={style.ordenContainer}>
					<div className={style.filter}>Ordenar por</div>
					<div className={style.divSelects}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'sort-price-label'} sx={{color: '#999999'}} >Precio</InputLabel>
							<CustomSelect
								labelId={'sort-price-label'}
								name={'price'}
								value={sortState.price}
								onChange={handleSort}
								displayEmpty
								fullWidth
								price={sortState.price}
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
								<CustomMenuItem value={'asc'}>Menor Precio</CustomMenuItem>
								<CustomMenuItem value={'desc'}>Mayor Precio</CustomMenuItem>
							</CustomSelect>
						</ThemeProvider>
					</div>

					<div className={style.divSelects}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'sort-name-label'} sx={{color: '#999999'}} >Nombre</InputLabel>
							<CustomSelect
								labelId={'sort-name-label'}
								name={'name'}
								value={sortState.name}
								onChange={handleSort}
								displayEmpty
								fullWidth
								nameprops={sortState.name}
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
								<CustomMenuItem value={'asc'}>A - Z</CustomMenuItem>
								<CustomMenuItem value={'desc'}>Z - A</CustomMenuItem>
							</CustomSelect>
						</ThemeProvider>
					</div>
				</div>
				<Divider sx={{width: '100%', height: '2px', backgroundColor: '#666666'}} />
				<div className={style.filtroContainer}>
					<div className={style.filter}>Filtrar por</div>
					<div className={style.divSelects}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'sort-category-label'} sx={{color: '#999999'}} >Categoría</InputLabel>
							<CustomSelect
								labelId={'sort-category-label'}
								name={'category'}
								value={filterState.category}
								onChange={handleFilter}
								displayEmpty
								fullWidth
								category={filterState.category}
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
								{props.categories.map(cat => (
									<CustomMenuItem key={cat.id} value={cat.name}>
										{cat.name}
									</CustomMenuItem>
								))}
							</CustomSelect>
						</ThemeProvider>
					</div>
					<div className={style.divSelects}>
						<ThemeProvider theme={theme}>
							<InputLabel id={'sort-subCategory-label'} sx={{color: '#999999'}} >Subcategoría</InputLabel>
							<CustomSelect
								labelId={'sort-subCategory-label'}
								name={'subCategory'}
								value={filterState.subCategory}
								onChange={handleFilter}
								displayEmpty
								fullWidth
								subcategory={filterState.subCategory}
								disabled={filterState.category === 'All'}
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
								{filterState.category !== 'All' && props.categories.find(cat => cat.name === filterState.category).subCategories.map(subCat => (
									<CustomMenuItem key={subCat.id} value={subCat.name}>
										{subCat.name}
									</CustomMenuItem>
								))}
							</CustomSelect>
						</ThemeProvider>
					</div>
					<div>
						<button
						className={style.btnProduct}
						type={'button'}
						onClick={handleRefresh}
						>REINICIAR FILTROS</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProductFilters;
