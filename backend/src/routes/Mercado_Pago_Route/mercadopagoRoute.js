const { Router } = require('express');
const { mercadopagoconfig } = require('../../config/mercadoPago');
const mercadopago = require('mercadopago');

mercadopagoconfig();
const router = Router();

router.post('/payment', async (req, res) => {
	let cart = req.body;

	let isDonation = cart[0].description === 'Donacion';

	let backUrl = isDonation
		? 'https://patitas-felices.vercel.app/donation/success_donation'
		: 'https://patitas-felices.vercel.app/products/success';

	let preference = {
		items: cart.map((product) => {
			return {
				id: product.id,
				title: product.name,
				currency_id: 'ARS',
				picture_url: product.image,
				description: product.description,
				category_id: product.category,
				quantity: product.quantity,
				unit_price: Number(product.price),
			};
		}),

		back_urls: {
			success: backUrl,
			failure: '',
			pending: '',
		},

		auto_return: 'approved',
		binary_mode: true,
	};

	try {
		const response = await mercadopago.preferences.create(preference);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
