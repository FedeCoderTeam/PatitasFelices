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

module.exports = {
    transporter,
    eventMail
}