const { order, user } = require('../../database/db');

const getAllOrders = async () => {
	try {
		let allOrders = await order.findAll({
			include: [
				{
					model: user,
				},
			],
		});

		if (!allOrders.length) {
			throw new Error('No orders available on Data Base');
		}

		return allOrders;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getAllOrders;
