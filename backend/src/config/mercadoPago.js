const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;

function mercadopagoconfig() {
	mercadopago.configure({ access_token: ACCESS_TOKEN });
}

module.exports = { mercadopagoconfig };
