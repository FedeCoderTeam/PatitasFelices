const { Router } = require('express');
const postOrder = require('../../controllers/Order_Controllers/orderControllers');
const getAllOrders = require('../../controllers/Order_Controllers/getOrderController');
const router = Router();

router.get('/', async (req, res) => {
	try {
		let allOrders = await getAllOrders();
		if (allOrders.error) throw new Error(allOrders.error);
		res.status(200).json(allOrders);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	let { status, total, payment_method, source, token } = req.body;
	try {
		let order = await postOrder(status, total, payment_method, source, token);
		if (order.error) throw new Error(order.error);
		res.status(200).json(order);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;
