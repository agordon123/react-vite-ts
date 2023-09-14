import "./App.css";
import { Provider } from "react-redux";
import { rootStore } from "./store/root";
import ItemsView from "./views/Items.view";
import React from "react";
function App() {

  return (
    <Provider store={rootStore}>
      <div>
      [{JSON.stringify(import.meta.env)}]
        <ItemsView />
      </div>
    </Provider>
  );
}

export default App;
