import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	getProductsById,
	setDetail,
	setItemsAction,
} from '../../../_redux/actions/productsAction';
import { useState } from 'react';
import style from './productDetail.module.css';
import ProductCard from '../../Cards/ProductCard/ProductCard';
import useToast from '../../../utils/hooks/useToast';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

// import { Player } from '@lottiefiles/react-lottie-player';
// import ShoppingCart from '../../../utils/animations/ShoppingCart.json'

function ProductDetail() {
	const { id } = useParams();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state) => state.authReducer.isAuthenticated,
	);

	const [count, setCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const toast = useToast();

	const handleClickSuma = () => {
		if (count < productDetail.stock) {
			setCount(count + 1);
		}
	};

	const handleClickResta = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};

	const productDetail = useSelector(
		(state) => state.productsReducer.productDetail,
	);

	const allProducts = useSelector((state) => state.productsReducer.products);

	const allProductNoId = allProducts.filter((product) => product.id !== productDetail.id);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		dispatch(getProductsById(id));
		return () => {
			dispatch(setDetail());
		};
	}, [allProducts, dispatch, id]);

	const addProduct = (quantity) => {
		if (!isAuthenticated) {
			Swal.fire({
				title: t('productDetail.fireTitle'),
				html: t('productDetail.fireHtml1')+ t('productDetail.fireHtml2') + t('productDetail.fireHtml3') + t('productDetail.fireHtml4') + t('productDetail.fireHtml5'),
				timer: 10000,
				icon: 'info',
			});
			return;
		}
		if (!localStorage.getItem('products'))
			localStorage.setItem('products', JSON.stringify([]));
		const getProductLocal = localStorage.getItem('products');
		const products = JSON.parse(getProductLocal);

		const productExist = products.find((p) => p.id === productDetail.id);

		if (productExist) {
			const max = productDetail.stock - productExist.quantity;
			const qtyAdd = quantity > max ? max : quantity;
			if (qtyAdd > 0) {
				productExist.quantity += qtyAdd;
			} else {
				toast.warning(t('productDetail.toastWarn'), { duration: 2000 });
			}
		} else {
			products.push({
				id: productDetail.id,
				quantity: quantity,
			});
		}

		const productUpdated = JSON.stringify(products);

		localStorage.setItem('products', productUpdated);
		setCount(0);
		dispatch(setItemsAction());
		toast.success(t('productDetail.toastSuccess'), { duration: 4000 });
	};

	return (
		<div className={style.divMain}>
			{isLoading ? (
				<img
					className={style.loader}
					src="https://res.cloudinary.com/dreso9ye9/image/upload/v1682557985/71390-shopping-cart-loader_egwna9.gif"
					alt="Cargando..."
				/>
			) : (
				<div className={style.bodyDetailProduct} data-aos="fade-down">
					<div className={style.containerProduct}>
						<div className={style.divLeft}>
							<Link className={style.links} to="/products">
								<i class="fa-solid fa-arrow-right fa-rotate-180"></i>
							</Link>
							<img
								className={style.imagenDetail}
								src={productDetail.image}
								alt={productDetail.name}
							/>
						</div>
						<div className={style.divRight}>
							<h1 className={style.titleName}>{productDetail.name}</h1>
							<h2 className={style.subTitleDescr}>
								{productDetail.description}
							</h2>
							<p className={style.priceDetail}>
								${productDetail.price}
								<span className={style.priceSpan}>.00</span>
							</p>
							<p className={style.pDeatil}>
								Stock:{' '}
								<span className={style.spanDetail}>{productDetail.stock}</span>
							</p>
							<div className={style.divCantidad}>
								<p className={style.pDeatil}>{t('productDetail.quant')}</p>
								<button
									className={style.btnRestaSuma}
									onClick={handleClickResta}
								>
									<span className={style.btnSpan}>-</span>
								</button>
								<p className={style.contador}>{count}</p>
								<button
									className={style.btnRestaSuma}
									onClick={handleClickSuma}
								>
									<span className={style.btnSpan}>+</span>
								</button>
							</div>
							<button
								disabled={count <= 0}
								style={count <= 0 ? { background: 'grey' } : {}}
								className={style.btnCarritoDetail}
								onClick={() => addProduct(count)}
							>
								{t('productDetail.addCart')}
							</button>
						</div>
					</div>
					<div className={style.containerOtros}>
						<div className={style.divTitleMasProductos}>
							<h2 className={style.titleMasProductos}>
								{t('productDetail.alsoInter')}
							</h2>
						</div>
						<div className={style.divOtros}>
							<div onClick={() =>
										setCurrentIndex(currentIndex > 0 && currentIndex - 1)
									} className={style.arrowLeft}>
									<i className="fa-solid fa-chevron-left" ></i>
							</div>
							{allProductNoId.length && allProductNoId.slice(currentIndex, currentIndex + 3).map((product) => (
								<ProductCard
									key={product.id}
									id={product.id}
									name={product.name}
									image={product.image}
									brand={product.brand}
									price={product.price}
								/>
							))}
							<div onClick={() =>
									setCurrentIndex((currentIndex + 1) % allProductNoId.length)
								} className={style.arrowRight}>
								<i className="fa-solid fa-chevron-right"></i>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetail;
