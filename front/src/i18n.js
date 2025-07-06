import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .init({
    load: 'languageOnly', // THIS is the magic to force 'en' instead of 'en-US'
    backend:{
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: "en",
    returnObjects:true,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;