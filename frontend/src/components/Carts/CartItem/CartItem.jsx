import * as React from 'react';
import {Button, Drawer} from '@mui/material';
import style from './CartItem.module.css'

const CartItem = ({ item, addToCart, removeFromCart }) => {
    return(<>
        <div className={`${style.cartItem} ${style.wrapper}`}>
            <div>
                <h3>{item.name}</h3>
                <div className={style.information}>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                </div>
                <div className={style.buttons}>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => removeFromCart(item.id)}
                    >
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => addToCart(item)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </div>
    </>)
}

export default CartItem