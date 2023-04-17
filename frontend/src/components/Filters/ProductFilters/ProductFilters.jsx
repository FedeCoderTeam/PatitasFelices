import React from 'react';
import style from './productFilters.module.css';
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

	return (
		<div className={style.main}>
			<form action="" className={style.formControl}>
				<div className={style.searchBar}>
					<SearchProduct />
				</div>

				<div className={style.ordenContainer}>
					<div className={style.orden}>Ordenar por</div>
					<div className={style.precio}>
						<div>Precio</div>
						<select
							name=""
							id=""
							onChange={(event) => {
								handleOrder(event, 'price');
							}}
						>
							<option selected disabled>
								Elegir
							</option>
							<option value="asc">Menor Precio</option>
							<option value="desc">Mayor Precio</option>
						</select>
					</div>

					<div className={style.abc}>
						<div>Nombre</div>
						<select
							name=""
							id=""
							onChange={(event) => {
								handleOrder(event, 'abc');
							}}
						>
							<option selected disabled>
								Elegir
							</option>
							<option value="asc">A - Z</option>
							<option value="desc">Z - A</option>
						</select>
					</div>
				</div>

				<div className={style.filtroContainer}>
					<div className={style.filtro}>Filtrar por</div>
					<div className={style.categoria}>
						<div>Categoria</div>
						<select
							name=""
							id=""
							value={setCategory}
							onChange={(event) => {
								handleCategory(event);
							}}
						>
							<option value="All">Todos</option>
							<option value="Alimentos">Alimentos</option>
							<option value="Accesorios">Accesorios</option>
						</select>
					</div>
					<div className={style.subCategoria}>
						<div>Subcategoria</div>
						<select
							name=""
							disabled={!subCategory.length}
							id=""
							value={setSubCategory}
							onChange={(event) => {
								handleSubCategory(event);
							}}
						>
							<option value="All">Todos</option>
							{subCategory?.map((e) => (
								<option key={e.id} value={e.name}>
									{e.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProductFilters;
