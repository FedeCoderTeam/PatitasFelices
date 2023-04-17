require('dotenv').config();
const firebase = require('firebase/app');
const { getAuth } = require('firebase/auth')

const { FIRE_CONFIG_API_KEY, FIRE_CONFIG_AUTH_DOMAIN, FIRE_CONFIG_PROJECT_ID, FIRE_CONFIG_STORAGE_BUCKET, FIRE_CONFIG_MESSAGING_SENDER_ID, FIRE_CONFIG_APP_ID, FIRE_CONFIG_MEASUREMENT_ID } = process.env

const firebaseConfig = {
    apiKey: FIRE_CONFIG_API_KEY,
    authDomain: FIRE_CONFIG_AUTH_DOMAIN,
    projectId: FIRE_CONFIG_PROJECT_ID,
    storageBucket: FIRE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: FIRE_CONFIG_MESSAGING_SENDER_ID,
    appId: FIRE_CONFIG_APP_ID,
    measurementId: FIRE_CONFIG_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

module.exports = {firebase, getAuth}