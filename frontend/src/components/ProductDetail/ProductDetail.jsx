import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProductsById } from "../../_redux/actions/productsAction";
import { useState } from "react";
import style from "../ProductDetail/productDetail.module.css";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [count, setCount]= useState(0);

  const handleClickSuma= ()=> {
    if (count < 100) {
      setCount(count + 1);
    }
  } 
  
  const handleClickResta= ()=> {
    if (count > 0) {
      setCount(count - 1);
    }
  }  

  const productDetail = useSelector(
    (state) => state.productsReducer.allProducts

  );

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  return (
    <div className={style.bodyDetailProduct}>
      <div className={style.containerProduct}>
        <div className={style.divLeft}>
          <img className={style.imagenDetail} src={productDetail.image} alt={productDetail.name} />
        </div>
        <div className={style.divRight}>
          <h1 className={style.titleName}>{productDetail.name}</h1>
          <h2 className={style.subTitleDescr}>{productDetail.description}</h2>
          <p className={style.priceDetail}>${productDetail.price}<span className={style.priceSpan}>.00</span></p>
          <p className={style.pDeatil}>Id: <span className={style.spanDetail}>{productDetail.id}</span></p>
          <p className={style.pDeatil}>Stock: <span className={style.spanDetail}>{productDetail.stock}</span></p>
          <div className={style.divCantidad}>
              <p className={style.pDeatil}>Cantidad: </p>
              <button className={style.btnRestaSuma} onClick={handleClickResta}><span className={style.btnSpan}>-</span></button>
              <p className={style.contador}>{count}</p>
              <button className={style.btnRestaSuma} onClick={handleClickSuma}><span className={style.btnSpan}>+</span></button>
          </div>
          <button className={style.btnCarritoDetail}>AÑADIR AL CARRITO</button>
        </div>
      </div>
      <h2 className={style.titleMasProductos}>También te pueden interesar</h2>
      <div className={style.divOtros}>
        {/* RENDER ALEATORIOS */}
      </div>
    </div>
  );
}

export default ProductDetail;