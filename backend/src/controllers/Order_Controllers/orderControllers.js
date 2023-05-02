const { order, user } = require('../../database/db');
const { verifyToken } = require('../../utils/token');

const postOrder = async (status, total, payment_method, source, token) => {
	console.log(status, total, payment_method, source, token);
	try {
		if (!status || !total || !payment_method || !source)
			throw new Error(
				'Status, total, payment method, source anda are required',
			);

		let newOrder = await order.create({
			status: status,
			total: total,
			payment_method: payment_method,
			source: source,
		});

		if (token) {
			const decoded = await verifyToken(
				token,
				process.env.JWT_PRIVATE_KEY_AUTH,
			);

			let buyer = await user.findOne({
				where: {
					id: decoded.user.id,
				},
			});

			await newOrder.setUser(buyer);
		}

		return newOrder;
	} catch (error) {
		console.log(error);
		return 'Error in create order';
	}
};

module.exports = postOrder;
