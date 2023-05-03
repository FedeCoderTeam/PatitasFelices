const { Router } = require('express');
const getPurchases = require('../../controllers/Purchase_Controllers/getPurchaseControllers');
const purchaseControllers = require('../../controllers/Purchase_Controllers/purchaseControllers');
const router = Router();

router.get('/', async (req, res) => {
	try {
		let allPurchases = await getPurchases();
		if (allPurchases.error) throw new Error(allPurchases.error);
		res.status(200).json(allPurchases);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	let purchases = req.body;
	try {
		let purchase = await purchaseControllers(purchases);
		if (purchase.error) throw new Error(purchase.error);
		res.status(200).json(purchase);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;
