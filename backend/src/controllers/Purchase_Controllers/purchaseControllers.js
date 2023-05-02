const { order, orderItem, product } = require('../../database/db');

const purchaseControllers = async (purchases) => {
	try {
		for (let i = 0; i < purchases.length; i++) {
			let purchase = await orderItem.create({
				quantity: purchases[i].quantity,
			});

			let sellProduct = await product.findOne({
				where: {
					id: purchases[i].idProduct,
				},
			});

			await purchase.setProduct(sellProduct);

			let orderPurchase = await order.findOne({
				where: {
					id: purchases[i].idOrder,
				},
			});

			await purchase.setOrder(orderPurchase);
		}

		return 'Successfully created pruchase';
	} catch (error) {
		console.log(error);
		return 'Error in create purchase';
	}
};

module.exports = purchaseControllers;
