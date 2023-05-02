const { order, orderItem, product } = require('../../database/db');

const getAllPurchase = async () => {
	try {
		let allPurchase = await orderItem.findAll({
			include: [
				{
					model: product,
				},
				{
					model: order,
				},
			],
		});

		if (!allPurchase.length) {
			throw new Error('No purchases available on Data Base');
		}

		return allPurchase;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getAllPurchase;
