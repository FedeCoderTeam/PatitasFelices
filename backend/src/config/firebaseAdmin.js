require('dotenv').config();
const admin = require('firebase-admin')
const {
    FIRE_ADMIN_TYPE,
    FIRE_ADMIN_PROJECT_ID,
    FIRE_ADMIN_PRIVATE_KEY_ID,
    FIRE_ADMIN_PRIVATE_KEY,
    FIRE_ADMIN_CLIENT_EMAIL,
    FIRE_ADMIN_CLIENT_ID,
    FIRE_ADMIN_AUTH_URI,
    FIRE_ADMIN_TOKEN_URI,
    FIRE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    FIRE_ADMIN_CLIENT_X509_CERT_URL
} = process.env

const serviceAccount = {
    "type": FIRE_ADMIN_TYPE,
    "project_id": FIRE_ADMIN_PROJECT_ID,
    "private_key_id": FIRE_ADMIN_PRIVATE_KEY_ID,
    "private_key": FIRE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": FIRE_ADMIN_CLIENT_EMAIL,
    "client_id": FIRE_ADMIN_CLIENT_ID,
    "auth_uri": FIRE_ADMIN_AUTH_URI,
    "token_uri": FIRE_ADMIN_TOKEN_URI,
    "auth_provider_x509_cert_url": FIRE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": FIRE_ADMIN_CLIENT_X509_CERT_URL
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin