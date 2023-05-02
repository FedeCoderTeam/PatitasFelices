const { transporter } = require('../config/mailer');
const { readHTMLFile } = require('./readHTMLFile');

const email_account_verification = async (user, token, lang = 'es') => {
	const subject_en = `Account verification for Happy Paws`;
	const subject_es = `Verificación de cuenta de Patitas Felices`;

	const replacements = {
		username: user.name,
		token: token,
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/email_verification_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/email_verification_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${user.email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

const email_reset_password = async (user, token, lang = 'es') => {
	const subject_en = `Reset password - Happy Paws`;
	const subject_es = `Recuperar contraseña - Patitas Felices`;

	const replacements = {
		username: user.name,
		token: token,
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/email_reset_password_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/email_reset_password_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${user.email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

const event_successful_registration = async (user, lang = 'es') => {
	const subject_en = `Welcome to our Happy Paws Community!`;
	const subject_es = `Bienvenido a nuestra comunidad de Patitas Felices!`;

	const replacements = {
		username: user.name
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/successful_registration_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/successful_registration_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${user.email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
}

const event_request_dogs_mail = async (id, userinfo, dog, lang = 'es') => {
	const subject_en = `Adoption application #${id} - Happy Paws`;
	const subject_es = `Solicitud de adopción #${id} - Patitas Felices`;

	const replacements = {
		dogname: dog,
		fullname: userinfo.name,
		phone: userinfo.phone,
		address: userinfo.address,
		email: userinfo.email,
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/email_completed_form_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/email_completed_form_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${userinfo.email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

const event_rejected_adoption = async (id, email, lang = 'es') => {
	const subject_en = `Adoption application #${id} (Refused) - Happy Paws`;
	const subject_es = `Solicitud de adopción #${id} (Rechazado) - Patitas Felices`;

	const replacements = {
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/rejected_adoption_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/rejected_adoption_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

const event_successful_donation = async (userinfo, lang = 'es') => {
	const subject_en = `Thank you for your donation! - Happy Paws`;
	const subject_es = `¡Gracias por tu donación! - Patitas Felices`;

	const replacements = {
		username: userinfo.name,
		amount: userinfo.amount
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/successful_donation_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/successful_donation_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${userinfo.email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

const event_successful_purchase = async (order, lang = 'es') => {
	const subject_en = `Thank you for your purchase! - Happy Paws`;
	const subject_es = `¡Gracias por tu compra! - Patitas Felices`;

	const replacements = {
		order: order.id,
		product: order.product,
		amount: order.amount
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/successful_purchase_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/successful_purchase_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${order.email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

const event_approved_adoption = async (id, email, dog, lang = 'es') => {
	const subject_en = `Adoption application #${id} (Approved) - Happy Paws`;
	const subject_es = `Solicitud de adopción #${id} (Aprobado) - Patitas Felices`;

	const replacements = {
		dogname: dog.name,
		weight: dog.weight,
		color: dog.color,
		temperament: dog.temperament,
		age: dog.age,
		description: dog.description,
	};

	const html_en = await readHTMLFile(
		__dirname + '/template/approved_adoption_en.html',
		replacements,
	);
	const html_es = await readHTMLFile(
		__dirname + '/template/approved_adoption_es.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${email}`,
		subject: lang === 'es' ? subject_es : subject_en,
		html: lang === 'es' ? html_es : html_en,
	});
};

module.exports = {
	event_request_dogs_mail,
	email_account_verification,
	email_reset_password,
	event_successful_registration,
	event_rejected_adoption,
	event_successful_donation,
	event_successful_purchase,
	event_approved_adoption
};
