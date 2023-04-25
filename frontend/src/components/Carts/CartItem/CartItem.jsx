import * as React from 'react';
import {Button, Fab} from '@mui/material';
import style from './CartItem.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, handleAddProduct, handleSubtractProduct, handleRemoveProduct }) => {
    return(<>
        <div className={`${style.cartItem} ${style.wrapper}`}>
            <div className={style.productImage}>
                <img src={item.image} alt={item.title} />
            </div>
            <div>
                <div className={style.title}>
                    <h3>{item.name}</h3>
                    <Fab size={'small'} color={'error'} aria-label={'delete'} onClick={() => handleRemoveProduct(item)}>
                        <DeleteIcon />
                    </Fab>
                </div>
                <div className={style.information}>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                </div>
                <div className={style.buttons}>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => handleSubtractProduct(item)}
                            color={item.quantity === 1 ? 'error' : 'primary'}
                            disabled={item.quantity === 1}
                        >
                            <RemoveIcon />
                        </Button>
                    <p>{item.amount}</p>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => handleAddProduct(item)}
                            disabled={item.quantity === item.stock}
                        >
                            <AddIcon />
                        </Button>
                </div>
            </div>
        </div>
    </>)
}

export default CartItem