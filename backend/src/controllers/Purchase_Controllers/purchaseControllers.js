const { order, orderItem, product, user } = require('../../database/db');
const {event_successful_purchase} = require('../../utils/email');

const purchaseControllers = async (purchases) => {
	let flag = true
	let idOrder;
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

			if(flag) {
				idOrder = purchases[i].idOrder
				flag = false;
			}
		}

		const info = await order.findOne({where: {id: idOrder}, include: [
			{
				model: user
			},
			{
				model: orderItem,
				include: [
					{
						model:product
					}
				]
			}
			]})
		const productsArray = info.orderItems.map(oi => {
			const productInfo = oi.product.get({plain: true})
			const formattedPrice = Number(productInfo.price).toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})
			return {
				...productInfo,
				quantity: oi.quantity,
				price: formattedPrice
			}
		})
		const orderObj = {
			email: info.user.email,
			id: info.id,
			amount: Number(info.total).toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}),
			product: productsArray
		}
		await event_successful_purchase(orderObj)

		return 'Successfully created pruchase';
	} catch (error) {
		console.log(error);
		return 'Error in create purchase';
	}
};

module.exports = purchaseControllers;
