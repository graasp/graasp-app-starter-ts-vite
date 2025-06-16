import { initReactI18next } from 'react-i18next';

import { createInstance } from 'i18next';
import LangDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';

export const DEFAULT_LANGUAGE = 'en';

createInstance()
  .use(Fetch)
  .use(LangDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    // namespaces that will be loaded by default
    ns: ['common'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // specify which languages are supported
    // 1. prefers exact match across all supported langs
    // 2. prefers lang without locale
    // 3. uses fallback
    supportedLngs: ['fr', DEFAULT_LANGUAGE],
    // options for the language detector
    detection: {
      // The priority order is defined as:
      // 1. querystring: users coming from an external link may want to see the page in the language set by the link
      // 2. localstorage: users that have an item in their localstorage (already visited the page with an account)
      // 3. navigator: use the the user preferred interface language as a last resort.
      order: ['querystring', 'localStorage', 'navigator'],
      // store the language in the localstorage for persistance
      caches: ['localStorage'],
      // the name of the query parameter to look for the language (default: lng)
      lookupQuerystring: 'lang',
    },
    react: {
      // prevent the translations from using the react suspense and thus making the interface flicker
      useSuspense: false,
    },
  });
