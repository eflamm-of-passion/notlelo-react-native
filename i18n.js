import i18n from 'i18n-js';

import en from './locales/en.json';
import fr from './locales/fr.json';

i18n.defaultLocale = 'fr';
i18n.locale = 'fr';
i18n.fallbacks = true;
i18n.translations = { en, fr };

export default i18n;

// https://whatdidilearn.info/2019/01/20/internationalization-in-react-native.html
