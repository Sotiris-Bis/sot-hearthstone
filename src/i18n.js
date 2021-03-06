import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

//import { languages } from './locales/index.js';
// import { defaultLocale } from './locales/index.js';
// const messages = Object.assign(languages);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
function langSelect() {
  if (`${localStorage.lang}` !== 'undefined') {
    return `${localStorage.lang}`;
  } else return 'en_GB';
}

export default new VueI18n({
  locale: langSelect(),
  fallbackLocale: 'en_GB',
  messages: loadLocaleMessages(),
  silentTranslationWarn:true
});

// var i18n = new VueI18n({
//   locale: defaultLocale,
//   fallbackLocale: 'en_GB',
//   messages
// });

// export default i18n;
