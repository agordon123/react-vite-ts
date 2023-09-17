import "./App.css";
import { Provider } from "react-redux";
import { rootStore } from "./store/root";
import ItemsView from "./views/Items.view";
import React from "react";
import { useLocalization } from "./localization";
function App() {
  const { t, locales, currentLocale, getUserPreferredLocale, changeLocale } =
    useLocalization();
  if (!isLocaleLoaded) {
    changeLocale(getUserPreferredLocale());
  }
  const onLocaleClick = (lcid: string) => {
    changeLocale(lcid);
  };
  return (
    <Provider store={rootStore}>
      <div>
        <div className="locale-selector">
          {
            /* loop through the locales and create a radio button for each locale */ locales.map(
              (item) => {
                const radioId = `radio-locale-${item.key}`;
                return (
                  <label
                    key={item.key}
                    htmlFor={radioId}
                    className="cursor-pointer"
                    onClick={() => onLocaleClick(item.key)}
                  >
                    <input
                      type="radio"
                      id={radioId}
                      radioGroup={currentLocale}
                      name="\ locale"
                      value={item.key}
                      checked={currentLocale === item.key}
                      onChange={() => {}}
                    />
                    t(`locale.selector.${item.key}`)
                  </label>
                );
              }
            )
          }
        </div>
        <h1>
          {t("home.welcome")}{" "}
          {/* update this to use the t function to translate\
 our welcome message */}
        </h1>
        <ItemsView />
      </div>
    </Provider>
  );
}

export default App;
