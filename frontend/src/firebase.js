import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDe4Gtle7MQLRQsWmUcvwneDii5zf886Og',
    authDomain: 'patitasfelices-a28fd.firebaseapp.com',
    projectId: 'patitasfelices-a28fd',
    storageBucket: 'patitasfelices-a28fd.appspot.com',
    messagingSenderId: '683292234408',
    appId: '1:683292234408:web:53f2d50eb9bd91f6bce89d',
    measurementId: 'G-EBXYNSM2VJ'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)