import React from 'react';
import style from './ProductFilters.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as productsAction from '../../../_redux/actions/productsAction';
import SearchProduct from '../../SearchBar/SearchProduct/SearchProduct';

const ProductFilters = () => {
	const dispatch = useDispatch();
	const setCategory = useSelector((state) => state.productsReducer.setCategory);
	const setSubCategory = useSelector(
		(state) => state.productsReducer.setSubCategory,
	);
	const subCategory = useSelector((state) => state.productsReducer.subCategory);

	const handleOrder = (event, by) => {
		dispatch(
			productsAction.setFilter({
				sortOrder: event.target.value,
				sortBy: by,
			}),
		);
		dispatch(productsAction.sortAction());
	};

	const handleCategory = (event) => {
		dispatch(
			productsAction.setFilter({
				setCategory: event.target.value,
			}),
		);

		dispatch(
			productsAction.setFilter({
				setSubCategory: 'All',
			}),
		);

		let num =
			event.target.value === 'All'
				? 0
				: event.target.value === 'Alimentos'
				? 1
				: 2;

		dispatch(productsAction.getIdSubCategory(num));
		dispatch(productsAction.getAllsubCategory());
		dispatch(productsAction.filter());
		dispatch(productsAction.sortAction());
	};

	const handleSubCategory = (event) => {
		dispatch(
			productsAction.setFilter({
				setSubCategory: event.target.value,
			}),
		);
		dispatch(productsAction.filter());
		dispatch(productsAction.sortAction());
	};
	const handleRefresh = (e) => {
		e.preventDefault();
		dispatch(productsAction.setFilter({
			sortOrder:"",
			sortBy:"",
			setCategory: "All",
			setSubCategory: "All",
		}))
		dispatch(productsAction.filter())
		dispatch(productsAction.sortAction());
		dispatch(productsAction.setPage(1))
	}
	return (
		<div className={style.main}>
			<form action="" className={style.formControl}>
				<div className={style.searchBar}>
					<SearchProduct />
				</div>

				<div className={style.ordenContainer}>
					<div className={style.filter}>Ordenar por</div>
					<div className={style.divSelects}>
						<div>Precio</div>
						<select
							defaultValue="1"
							className={style.selects}
							name=""
							id=""
							onChange={(event) => {
								handleOrder(event, 'price');
							}}
						>
							<option className={style.options} value="1" >
								Elegir
							</option>
							<option className={style.options} value="asc">
								Menor Precio
							</option>
							<option className={style.options} value="desc">
								Mayor Precio
							</option>
						</select>
					</div>

					<div className={style.divSelects}>
						<div>Nombre</div>
						<select
							defaultValue="1"
							className={style.selects}
							name=""
							id=""
							onChange={(event) => {
								handleOrder(event, 'abc');
							}}
						>
							<option className={style.options} value="1" >
								Elegir
							</option>
							<option className={style.options} value="asc">
								A - Z
							</option>
							<option className={style.options} value="desc">
								Z - A
							</option>
						</select>
					</div>
				</div>

				<div className={style.filtroContainer}>
					<div className={style.filter}>Filtrar por</div>
					<div className={style.divSelects}>
						<div>Categoria</div>
						<select
							className={`${style.selects} ${setCategory !== 'All' ? style.focus : ''}`}
							name=""
							id=""
							value={setCategory}
							onChange={(event) => {
								handleCategory(event);
							}}
						>
							<option className={style.options} value="All">
								Todos
							</option>
							<option className={style.options} value="Alimentos">
								Alimentos
							</option>
							<option className={style.options} value="Accesorios">
								Accesorios
							</option>
						</select>
					</div>
					<div className={style.divSelects}>
						<div>Subcategoria</div>
						<select
							className={`${style.selects} ${setSubCategory !== 'All' ? style.focus : ''}`}
							name=""
							disabled={!subCategory.length}
							id=""
							value={setSubCategory}
							onChange={(event) => {
								handleSubCategory(event);
							}}
						>
							<option className={style.options} value="All">
								Todos
							</option>
							{subCategory?.map((e) => (
								<option className={style.options} key={e.id} value={e.name}>
									{e.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<button
						className={style.btnProduct}
						onClick={(e) => handleRefresh(e)}
						>REINICIAR FILTROS</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProductFilters;
