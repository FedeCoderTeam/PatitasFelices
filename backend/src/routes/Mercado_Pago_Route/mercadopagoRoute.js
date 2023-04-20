const { Router } = require('express');
const { mercadopagoconfig } = require('../../config/mercadoPago');
const mercadopago = require('mercadopago');

mercadopagoconfig();
const router = Router();

router.post('/payment', (req, res) => {
	let prod = req.body;

	let preference = {
		items: [
			{
				id: prod.id,
				title: prod.name,
				currency_id: 'ARS',
				picture_url: prod.image,
				description: prod.description,
				category_id: prod.category,
				quantity: 1,
				unit_price: Number(prod.price),
			},
		],

		back_urls: {
			success: 'http://localhost:3000/home',
			failure: '',
			pending: '',
		},

		auto_return: 'approved',
		binary_mode: true,
	};

	mercadopago.preferences
		.create(preference)
		.then((response) => res.status(200).send({ response }))
		.catch((error) => res.status(400).send({ error: error.message }));
});

module.exports = router;
