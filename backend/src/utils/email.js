const { transporter } = require('../config/mailer');
const { readHTMLFile } = require('./readHTMLFile');

const event_request_dogs_mail = async (emailSolicitud, name) => {
	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${emailSolicitud}`,
		subject: `Solicitud de adopción #`,
		html: `
        <b>Hola, ${name}:</b>
        <b>Muchas gracias por querer cambiar la vida de uno de nuestro perritos</b>
        <b>Hemos recibido tu solitud de adopción y está siendo procesada. A la brevedad, nos pondremos en contacto con usted 
        tan pronto tengamos una respuesta</b>
        <b>Saludos cordiales</b>
        
        <b>El equipo de Patitas Felices</b>
        `,
	});
};
const eventRequest_Dogs_Mail_Owner = async (
	emailOwner,
	emailSolicitud,
	dogObj,
) => {
	await transporter.sendMail({
		from: '"Patitas Felices" <noreply@patitasfelices.com>',
		to: `${emailSolicitud}`,
		subject: 'Prueba de parte Patitas Felices',
		html: `
        <b>Testeando</b>
        `,
	});
};

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

// const email_successful_purchase = async (user, lang = 'es') => {
// 	const subject_en = ``;
// 	const subject_es = ``;

// 	await transporter.sendMail({
// 		from: '"Patitas Felices" <noreply@patitasfelices.com>',
// 		to: `${user.email}`,
// 		subject: lang === 'es' ? subject_es : subject_en,
// 		html: lang === 'es' ? html_es : html_en,
// 	});
// };

module.exports = {
	event_request_dogs_mail,
	email_account_verification,
	email_reset_password,
};
