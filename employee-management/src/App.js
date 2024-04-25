//App.js
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Router from "./router/Router";
import AddEmployeeDetails from "./components/AddEmployeeDetails";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router />
        {/* <AddEmployeeDetails /> */}
      </div>
    </Provider>
  );
}

export default App;
