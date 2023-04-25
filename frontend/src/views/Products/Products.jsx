import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/Cards/ProductCard/ProductCard.jsx';
import * as productsAction from '../../_redux/actions/productsAction.js';
import PaginatedProducts from '../../components/Paginated/PaginatedProducts/PaginatedProducts.jsx';
import ProductFilters from '../../components/Filters/ProductFilters/ProductFilters.jsx';
import style from './Products.module.css';

const Products = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector((state) => state.productsReducer.products);
	let currentPage = useSelector((state) => state.productsReducer.currentPage);

	//----------------------------------------------PAGINADO-------------------------------------------
	const [productsPerPage] = useState(5);
	const [range, setRange] = useState({ firts: 0, last: 5 });
	const [currentProducts, setCurrentProducts] = useState(
		allProducts.slice(range.firts, range.last),
	);
	const paginado = (pageNumber) => {
		dispatch(productsAction.setPage(pageNumber));
	};

	//-------------------------------------------------------------------------------------------------
	useEffect(() => {
		setCurrentProducts(allProducts.slice(range.firts, range.last));
		console.log(allProducts);
		//isDisbled
		//stock
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
			<div className={style.filtersContainer}>
				<ProductFilters />
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
					<h1>No hay ningún producto</h1>
				) : (
					<div className={style.cardsContainer}>
						{currentProducts?.map((e) => {
							return (e.isDisabled === false && e.stock >= 1
							&&  <ProductCard
									key={e.id}
									id={e.id}
									image={e.image}
									name={e.name}
									brand={e.brand}
									description={e.description}
									price={e.price}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Products;
