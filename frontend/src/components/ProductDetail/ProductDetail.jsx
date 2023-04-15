import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProductsById } from "../../_redux/actions/productsAction";
import style from "../ProductDetail/productDetail.module.css"

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetail = useSelector(
    (state) => state.productsReducer.allProducts

  );

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  return (
    <div className={style.bodyDetailProduct}>
      <div className={style.divLeft}>
        <img src={productDetail.image} alt="image not found" />
      </div>
      <div className={style.divRight}>
        <h1>{productDetail.name}</h1>
        <h2>{productDetail.description}</h2>
        <p>{productDetail.price}</p>
        <p>Id: {productDetail.id}</p>
        <p>Stock: {productDetail.stock}</p>
        <div>
            <p>Cantidad: {productDetail.stock}</p>
            <button>+</button>
            {/* <p>{count}</p> */}
            <button>-</button>
        </div>
        <button>AÑADIR AL CARRITO</button>
      </div>
      <h2>También te pueden interesar</h2>
      <div className={style.divOtros}>
        {/* RENDER ALEATORIOS */}
      </div>
    </div>
  );
}

export default ProductDetail;