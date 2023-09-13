import "./App.css";
import { Provider } from "react-redux";
import { rootStore } from "./store/root";
import ItemsView from "./views/Items.view";
function App() {

  return (
    <Provider store={rootStore}>
      <div>
        <ItemsView />
      </div>
    </Provider>
  );
}

export default App;
