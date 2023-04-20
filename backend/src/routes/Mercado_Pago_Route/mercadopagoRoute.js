const { Router } = require('express');
const { mercadopagoconfig } = require('../../config/mercadoPago');
const mercadopago = require('mercadopago');

mercadopagoconfig();
const router = Router();

router.post('/payment', async (req, res) => {
	let { id, name, image, description, category, price } = req.body;

	let preference = {
		items: [
			{
				id: id,
				title: name,
				currency_id: 'ARS',
				picture_url: image,
				description: description,
				category_id: category,
				quantity: 1,
				unit_price: Number(price),
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

	try {
		const response = await mercadopago.preferences.create(preference);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: error.message });
	}
});

// mercadopago.preferences
// 	.create(preference)
// 	.then((response) => res.status(200).send({ response }))
// 	.catch((error) => res.status(400).send({ error: error.message }));
module.exports = router;
