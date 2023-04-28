import axios from 'axios';
import {} from '../reducer/mercadopagoReducer';

const setLinkDePagos = (items) => {
	return async function () {
		try {
			let link = await axios.post(
				'http://localhost:3001/mercadopago/payment',
				items,
			);
			window.location.href = link.data.body.init_point;
		} catch (error) {
			console.log(error);
		}
	};
};

export { setLinkDePagos };
