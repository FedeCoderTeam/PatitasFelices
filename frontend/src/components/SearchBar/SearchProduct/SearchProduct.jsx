import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as productsAction from '../../../_redux/actions/productsAction.js';
import style from './SearchProduct.module.css';

const SearchProduct = () => {
	const dispatch = useDispatch();
	let name = useSelector((state) => state.productsReducer.name);
  
	const handlerSetName = (event) => {
	  const regex = /^[a-zA-Z]+$/;
	  if (regex.test(event) || event === "") {
		dispatch(productsAction.setName({ name: event}));
	  }
	};
  
	const handleGetName = () => {
	  dispatch(productsAction.getName());
	  dispatch(productsAction.setPage(1));
	};
  
	return (
	  <>
		<div className={style.searchBar}>
		  <input
			className={style.input}
			autoComplete="off"
			type="text"
			placeholder="Search..."
			value={name}
			onChange={(event) => {
			  handlerSetName(event.target.value);
			  handleGetName();
			}}
		  />
		</div>
	  </>
	);
  };
  
  export default SearchProduct;
