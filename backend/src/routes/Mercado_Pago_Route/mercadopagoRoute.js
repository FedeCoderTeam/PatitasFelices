const { Router } = require('express');
const { mercadopagoconfig } = require('../../config/mercadoPago');
const mercadopago = require('mercadopago');
const updateStock = require('../../controllers/Product_Controllers/poductUpdateControllers');

mercadopagoconfig();
const router = Router();

router.post('/payment', async (req, res) => {
	let cart = req.body;

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
			success: 'http://localhost:3000/products/success',
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

// router.get('/payment/success', async (req, res) => {
// 	try {
// 		const paymentId = req.query.payment_id;
// 		const paymentInfo = await mercadopago.payment.get(paymentId);
// 		const products = paymentInfo.body.items;

// 		// Actualizar el stock de productos
// 		for (const product of products) {
// 			await updateStock(
// 				product.id,
// 				product.name,
// 				product.description,
// 				product.unit_price,
// 				product.picture_url,
// 				null,
// 				product.quantity * -1, // restar la cantidad comprada al stock
// 				null,
// 				product.category_id,
// 				null,
// 			);
// 		}

// 		res.render('paymentSuccess');
// 	} catch (error) {
// 		console.log(error);
// 		res.render('paymentError');
// 	}
// });

module.exports = router;
