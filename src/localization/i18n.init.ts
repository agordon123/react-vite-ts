import { initReactI18next } from "react-i18next";
import i18n, {
  BackendModule,
  Services,
  TOptions,
  InitOptions,
  ReadCallback,
} from "i18next";
import { config } from "../config";
import { apiClient } from "../api-client";

const localStorageConfig = config.localization.localStorageCache;
export const userPreferredLocaleStorageKey = "user-lcid";
// helper method to retrieve the user preferred locale from localStorage
export const getUserPreferredLocale = () => {
  // get a reference from the available locales array from our config
  const availableLocales = config.localization.locales;
  // try to retrive from local storage if they have one saved
  const preferredLocale = localStorage.getItem(userPreferredLocaleStorageKey);
  if (!preferredLocale) {
    // if not, use the default locale from config
    const defaultLocale = availableLocales.find((o) => o.isDefault)?.key;
    return defaultLocale;
  }
  return preferredLocale;
};
export const setUserPreferredLocale = (lcid: string) => {
  localStorage.setItem(userPreferredLocaleStorageKey, lcid);
};
const getLocaleData = async (
  namespace: string,
  lcid: string
): Promise<Object> => {
  // try to get it from locale storage
  // dynamic key we use to cache the actual locale JSON data in the browser local storage
  const localeStorageKey = `lcid-data-${lcid}`;
  // retrieve JSON as string
  const cacheEntryStr = localStorage.getItem(localeStorageKey) || "{}";
  // a variable to hold the parsed JSON data:
  let cacheEntry: { appVersion: number; expiresAt: number; json: string } = {
    appVersion: -1,
    expiresAt: 0,
    json: "",
  };
  // if localeStorage is enabled through config, then proced trying parsing the  cacheEntryStr
  if (localStorageConfig.enabled) {
    try {
      cacheEntry = JSON.parse(cacheEntryStr);
    } catch (e) {
      console.warn("error parsing data", cacheEntryStr);
    }
  }
  // check if we have cacheEntry and if matches app version and also did not expire
  if (
    cacheEntry &&
    cacheEntry.appVersion === config.global.version &&
    cacheEntry.expiresAt - Date.now() > 0
  ) {
    // return value from cache
    return cacheEntry.json;
  } else {
    const translationData = await apiClient.localization.fetchTranslation(
      namespace,
      lcid
    );
    // if localeStorage is enabled ...
    if (localStorageConfig.enabled) {
      // cache the translation data into localStorage
      const dt = new Date();
      // calculate expiration by adding N minutes as per config expirationInMinutes
      const expiresAt = dt.setMinutes(
        dt.getMinutes() + Number(localStorageConfig.expirationInMinutes)
      );
      // save our data to localStorage
      localStorage.setItem(
        localeStorageKey,
        JSON.stringify({
          appVersion: config.global.version,
          expiresAt: expiresAt,
          json: translationData,
        })
      );
    }
    // return value we retrieved from API
    return translationData;
  }
};
const backendModule: BackendModule = {
  type: "backend",
  init(
    services: Services,
    backendOptions: TOptions,
    i18nextOptions: InitOptions
  ): void {},
  read(language: string, namespace: string, callback: ReadCallback): void {
    console.log("backendModule read", language, namespace);
    const key = language;
    // invoke our helper method
    getLocaleData(namespace, key).then((obj) => callback(null, obj));
  },
};

i18n
.use(initReactI18next) // passes i18n down to react-i18next 
.use(backendModule) // use our custom backend module 
.init({
lng: getUserPreferredLocale(), 
// invoke our helper to get the user preferred lo\ cale (or the default)
fallbackLng: 'en-US', keySeparator: false, interpolation: {
escapeValue: false },
    load: 'currentOnly'
  });
