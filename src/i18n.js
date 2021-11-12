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

export default new VueI18n({
  locale: 'en_GB',
  fallbackLocale: 'en_GB',
  messages: loadLocaleMessages()
});

// var i18n = new VueI18n({
//   locale: defaultLocale,
//   fallbackLocale: 'en_GB',
//   messages
// });

// export default i18n;