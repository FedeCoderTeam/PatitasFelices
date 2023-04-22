const mercadopago = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

function mercadopagoconfig() {
	mercadopago.configure({ access_token: ACCESS_TOKEN });
}

module.exports = { mercadopagoconfig };
