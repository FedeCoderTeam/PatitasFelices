const { user , session, role, userVerification} = require ('../../database/db')
const {bcrypt} = require('../../utils/bcrypt');
const {signToken} = require('../../utils/token');
const {email_verification} = require('../../utils/email');

const verifyUser = async (token) => {

}

module.exports = verifyUser;