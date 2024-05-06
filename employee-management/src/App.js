//App.js
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Router from "./router/Router";
function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Router />
        </div>
      </Provider>
      {/* <Date /> */}
    </>
  );
}

export default App;
