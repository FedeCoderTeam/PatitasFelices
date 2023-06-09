import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/Cards/ProductCard/ProductCard.jsx';
import * as productsAction from '../../_redux/actions/productsAction.js';
import PaginatedProducts from '../../components/Paginated/PaginatedProducts/PaginatedProducts.jsx';
import ProductFilters from '../../components/Filters/ProductFilters/ProductFilters.jsx';
import style from './Products.module.css';
import { useTranslation } from 'react-i18next';


const Products = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	
	const allProducts = useSelector((state) => state.productsReducer.products);
	const categories = useSelector(state => state.productsReducer.categories)
	let currentPage = useSelector((state) => state.productsReducer.currentPage);

	//----------------------------------------------PAGINADO-------------------------------------------
	const [productsPerPage] = useState(7);
	const [range, setRange] = useState({ firts: 0, last: 7 });
	const [currentProducts, setCurrentProducts] = useState(
		allProducts.slice(range.firts, range.last),
	);
	const paginado = (pageNumber) => {
		dispatch(productsAction.setPageAction(pageNumber));
	};

	//-------------------------------------------------------------------------------------------------
	useEffect(() => {
		setCurrentProducts(allProducts.slice(range.firts, range.last));
		setRange({
			firts: (currentPage - 1) * productsPerPage,
			last: currentPage * productsPerPage,
		});
	}, [
		dispatch,
		allProducts,
		range.firts,
		range.last,
		currentPage,
		productsPerPage,
	]);

	return (
		
		<div className={style.main} data-aos="fade-down">
			<div className={style.filtersBox}>
				<div className={style.filtersContainer}>
					<ProductFilters categories={categories} />
				</div>
			</div>
			<div className={style.cardSection}>
				{!currentProducts.length ? (
					''
				) : (
					<div className={style.paginatedContainer}>
						<PaginatedProducts
							productsPerPage={productsPerPage}
							allProducts={allProducts?.length}
							paginado={paginado}
							currentPage={currentPage}
						/>
					</div>
				)}

				{!currentProducts.length ? (
					<h1>{t('product.noProduct')}</h1>
				) : (
					<div className={style.cardsContainer}>
						{currentProducts?.map((e) => {
							return (
								e.isDisabled === false &&
								e.stock >= 1 && (
									<ProductCard
										key={e.id}
										id={e.id}
										image={e.image}
										name={e.name}
										brand={e.brand}
										description={e.description}
										price={e.price}
									/>
								)
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Products;
