import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locale/es.json'
import en from './locale/en.json'

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        es: {
            translation: es
        }
    },
    fallbackLng: 'es',
    detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'lang'
    },
    interpolation: {
        escapeValue: false
    }
})

export default i18n;