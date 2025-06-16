import en from '../langs/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
