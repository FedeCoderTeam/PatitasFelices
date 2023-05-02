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
import { Player } from '@lottiefiles/react-lottie-player';
import ShoppingCart from '../../../utils/animations/ShoppingCart.json';

function ProductDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state) => state.authReducer.isAuthenticated,
	);

	const [count, setCount] = useState(0);
	const [randomProducts, setRandomProducts] = useState([]);
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
				title: 'Inicia sesión para agregar productos al carrito',
				html: `Por favor inicia sesión en tu cuenta o regístrate para agregar productos al carrito. Haz clic aquí para <a href='/login'>iniciar sesión</a> o <a href='/register'>registrarte</a>. ¡Gracias por elegirnos!`,
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
				toast.warning('No podes agregar mas productos', { duration: 2000 });
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
		toast.success('Producto agregado al carrito', { duration: 4000 });
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
								{Number(productDetail.price).toLocaleString('es-AR', {
									style: 'currency',
									currency: 'ARS',
								})}
							</p>
							<p className={style.pDeatil}>
								Stock:{' '}
								<span className={style.spanDetail}>{productDetail.stock}</span>
							</p>
							<div className={style.divCantidad}>
								<p className={style.pDeatil}>Cantidad: </p>
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
								AÑADIR AL CARRITO
							</button>
						</div>
					</div>
					<div className={style.containerOtros}>
						<div className={style.divTitleMasProductos}>
							<h2 className={style.titleMasProductos}>
								También te pueden interesar
							</h2>
						</div>
						<div className={style.divOtros}>
							<div className={style.arrows}>
								<i
									className="fa-solid fa-chevron-left"
									onClick={() =>
										setCurrentIndex(
											currentIndex > 0
												? (currentIndex - 1) % allProducts.length
												: currentIndex,
										)
									}
								></i>
							</div>
							{allProducts
								.slice(currentIndex + 1, currentIndex + 4)
								.map((product) => (
									<ProductCard
										key={product.id}
										id={product.id}
										name={product.name}
										image={product.image}
										brand={product.brand}
										price={product.price}
									/>
								))}
							<div className={style.arrows}>
								<i
									className="fa-solid fa-chevron-right"
									onClick={() =>
										setCurrentIndex((currentIndex + 4) % allProducts.length)
									}
								></i>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetail;
