import CartItem from "../CartItem/CartItem";
import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsAction, setLinkDePagos, setOpenAction } from '../../../_redux/actions/productsAction';
import style from './cart.module.css';
import Swal from 'sweetalert2';

const Cart = () => {
    const dispatch = useDispatch()

    const shoppingCart = useSelector(state => state.productsReducer.shoppingCart)
    const allProducts = useSelector(state => state.productsReducer.allProducts)

    const cartItems = allProducts.filter(p => shoppingCart.items.some(s => s.id === p.id)).map(p => ({ ...p, quantity: shoppingCart.items.find(s => s.id === p.id).quantity }))

    const calculateTotal = (items) => items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleOnBuy = () => {
        dispatch(setLinkDePagos(cartItems));
    }

    const handleCloseCart = () => {
        dispatch(setOpenAction())
    }

    const handleAddProduct = (product) => {
        const getProductLocal = localStorage.getItem('products')
        const products = JSON.parse(getProductLocal)

        const productExist = products.find(p => p.id === product.id)
        if (productExist) {
            const max = product.stock - productExist.quantity
            const qtyAdd = 1 > max ? max : 1;
            if (qtyAdd > 0) {
                productExist.quantity += qtyAdd;
            }
        }
        const productUpdated = JSON.stringify(products)
        localStorage.setItem('products', productUpdated)
        dispatch(setItemsAction())
    }

    const handleSubtractProduct = (product) => {
        const getProductLocal = localStorage.getItem('products')
        const products = JSON.parse(getProductLocal)

        const productExist = products.find(p => p.id === product.id)
        if (productExist) {
            if (productExist.quantity > 1) {
                productExist.quantity -= 1;
            } else {
                products.splice(products.indexOf(productExist), 1)
            }
        }
        const productUpdated = JSON.stringify(products)
        localStorage.setItem('products', productUpdated)
        dispatch(setItemsAction())
    }

    const handleRemoveProduct = (product) => {
        const getProductLocal = localStorage.getItem('products')
        const products = JSON.parse(getProductLocal)

        const productUpdated = JSON.stringify(products.filter(p => p.id !== product.id))
        localStorage.setItem('products', productUpdated)
        dispatch(setItemsAction())
    }

    const handleRemoveAllProducts = () => {
        localStorage.setItem('products', JSON.stringify([]))
        dispatch(setItemsAction())
    }

    return (
        <Drawer anchor={'right'} open={shoppingCart.isOpen}>
            <div className={style.wrapper}>
                <h1 className={style.close}><i class="fa-solid fa-xmark" onClick={handleCloseCart}></i></h1>
                <h2>Carro de compra</h2>
                {cartItems.length === 0 ? <p>No hay nada en el carrito.</p> : null}
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        handleAddProduct={handleAddProduct}
                        handleSubtractProduct={handleSubtractProduct}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                ))}
                    <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
                <div className={style.containerBtn}>
                    <button className={style.btnComprar} onClick={handleOnBuy} >Finalizar compra</button>
                    <button className={style.btnClean} onClick={handleRemoveAllProducts}>Limpiar carrito</button>
                </div>
            </div>
        </Drawer>
    );
};

export default Cart;