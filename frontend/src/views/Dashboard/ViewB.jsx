import React from 'react';
import { Link } from 'react-router-dom';

const ViewB = () => {
	return (
		<div>
			<section className="containerBtns-ViewB">
				<div>
					<Link to="./createProductForm">
						<button>a</button>
					</Link>

					<Link to="./updateProduct">
						<button>Editar Producto</button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default ViewB;
