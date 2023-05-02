import React from 'react';
import { Link } from 'react-router-dom';
import style from './homeDash.module.css';

const Home = () => {
	return (
		<>
			{/* <h1 style={{ display: 'flex', justifyContent: 'center' }}>Admin home </h1> */}

			<div className={style.containerBtnNav}>
				<Link to="/dashboard/" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHomeDash}>Home Dashboard</button>
				</Link>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<button className={style.btnBackHome}>Home Principal</button>
				</Link>
			</div>
		</>
	);
};

export default Home;
