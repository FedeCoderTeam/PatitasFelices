import CartItem from "../CartItem/CartItem";
import {Drawer} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {setLinkDePagos, setOpenAction} from '../../../_redux/actions/productsAction';
import './Cart.css'

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
    const dispatch = useDispatch()
    const shoppingCart = useSelector(state => state.productsReducer.shoppingCart)
    const calculateTotal = (items) => items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleOnComprar = () => {
        dispatch(setLinkDePagos(shoppingCart.items));
    }

    console.log(shoppingCart.items)

    return (
        <Drawer anchor={'right'} open={shoppingCart.isOpen} onClose={() => dispatch(setOpenAction())}>
            <div className={'wrapper'}>
                <h2>Your Cart</h2>
                {shoppingCart.items.length === 0 ? <p>No items in cart.</p> : null}
                {shoppingCart.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                ))}
                <h2>Total: ${calculateTotal(shoppingCart.items).toFixed(2)}</h2>
                <button className={'btnComprar'} onClick={handleOnComprar} >Finalizar compras</button>
            </div>
        </Drawer>
    );
};

export default Cart;