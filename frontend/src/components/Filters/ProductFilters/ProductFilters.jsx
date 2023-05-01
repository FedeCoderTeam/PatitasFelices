import React from 'react';
import style from './ProductFilters.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as productsAction from '../../../_redux/actions/productsAction';
import SearchProduct from '../../SearchBar/SearchProduct/SearchProduct';
import { useTranslation } from 'react-i18next';


const ProductFilters = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
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
					<div className={style.filter}>{t('dogFilters.orderby')}</div>
					<div className={style.divSelects}>
						<div>{t('prodFilters.price')}</div>
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
							{t('prodFilters.choose')}
							</option>
							<option className={style.options} value="asc">
							{t('prodFilters.cheap')}
							</option>
							<option className={style.options} value="desc">
							{t('prodFilters.expens')}
							</option>
						</select>
					</div>

					<div className={style.divSelects}>
						<div>{t('prodFilters.name')}</div>
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
							{t('prodFilters.choose')}
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
					<div className={style.filter}>{t('dogFilters.filterBy')}</div>
					<div className={style.divSelects}>
						<div>{t('prodFilters.category')}</div>
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
								{t('dogFilters.all')}
							</option>
							<option className={style.options} value="Alimentos">
							{t('prodFilters.food')}
							</option>
							<option className={style.options} value="Accesorios">
							{t('prodFilters.accessory')}
							</option>
						</select>
					</div>
					<div className={style.divSelects}>
						<div>{t('prodFilters.subcateg')}</div>
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
								{t('dogFilters.all')}
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
						>{t('dogFilters.reset')}</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProductFilters;
