require('dotenv').config();
const nodemailer = require('nodemailer')

const {MAIL_USER, MAIL_PASSWORD} = process.env

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    }
})

transporter.verify().then(() => {
    console.log('Ready for send emails.')
})

const eventMail = async () => {
    await transporter.sendMail({
        from: '"Patitas Felices" <noreply@patitasfelices.com>',
        to: 'federiconieto04@gmail.com, belen@gmail.com',
        subject: 'Prueba de parte Patitas Felices',
        html : `
        <b>Testeando</b>
        `
    })
}

//
const event_request_dogs_mail = async (emailSolicitud, userObj) => {
    await transporter.sendMail({
        from: '"Patitas Felices" <noreply@patitasfelices.com>',
        to: `${emailSolicitud}`,
        subject: `Solicitud de adopción #`,
        html : `
        <b>Hola, ${userObj.name}:</b>
        <b>Muchas gracias por querer cambiar la vida de uno de nuestro perritos</b>
        <b>Hemos recibido tu solitud de adopción y está siendo procesada. A la brevedad, nos pondremos en contacto con usted 
        tan pronto tengamos una respuesta</b>
        <b>Saludos cordiales</b>
        
        <b>El equipo de Patitas Felices</b>
        `
    })
}
const eventRequest_Dogs_Mail_Owner = async (emailOwner, emailSolicitud, dogObj) => {
    await transporter.sendMail({
        from: '"Patitas Felices" <noreply@patitasfelices.com>',
        to: `${emailSolicitud}`,
        subject: 'Prueba de parte Patitas Felices',
        html : `
        <b>Testeando</b>
        `
    })
}

module.exports = {
    transporter,
    eventMail
}