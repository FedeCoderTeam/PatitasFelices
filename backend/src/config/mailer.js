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

module.exports = {transporter}