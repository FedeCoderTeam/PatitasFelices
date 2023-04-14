const getAllProducts = require('../../controllers/Product_Controllers/productControllers');

const productByName = async (name) => {
	let name2 = name.toLowerCase();
	let all = await getAllProducts();
	let result = all.filter((inst) => inst.name.toLowerCase().includes(name2));

	if (result.length) {
		return result;
	} else {
		throw new Error(`El producto con nombre ${name} no existe`);
	}
};

module.exports = productByName;
