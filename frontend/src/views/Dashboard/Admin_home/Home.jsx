import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<Link to="/dashboard">
				<button style={{ marginTop: '40px' }}>OLVERA HOME DASHBOARD</button>
			</Link>
			<Link to="/home">
				<button style={{ marginTop: '40px' }}>VOLVER A HOME</button>
			</Link>
			<h1>HOMEEEEEEEEEEEEEEE</h1>
		</div>
	);
};

export default Home;
