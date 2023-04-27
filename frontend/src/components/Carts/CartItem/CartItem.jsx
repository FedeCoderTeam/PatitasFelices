import * as React from 'react';
import {Button, Fab} from '@mui/material';
import style from './CartItem.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from 'react-i18next';

const CartItem = ({ item, handleAddProduct, handleSubtractProduct, handleRemoveProduct }) => {
    const { t } = useTranslation()
    return(<>
            <div className={style.productImage}>
                <img src={item.image} alt={item.title} />
            </div>
        <div className={`${style.cartItem} ${style.wrapper}`}>
            <div className={style.dataContainer}>
                <div className={style.title}>
                    <h3>{item.name}</h3>
                    <Fab size={'small'} color={'error'} aria-label={'delete'} onClick={() => handleRemoveProduct(item)}>
                        <DeleteIcon />
                    </Fab>
                </div>
                <div className={style.information}>
                    <p>{t('cart.price')}: <span>${item.price}</span></p>
                    <p>{t('cart.quantity')}: <span className={style.productQuantity}>{item.quantity}</span></p>
                    <p>Total: <span>${(item.quantity * item.price).toFixed(2)}</span></p>
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