import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerReducer from "./redux/reducer/burgerReducer";
import orderReducer from "./redux/reducer/orderReducer";
import signUpReducer from "./redux/reducer/SignUpLoginReducer"

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log("MyLoggerMiddleware: Dispatching ==> ", action);
      console.log("MyLoggerMiddleware: STATE BEFORE :", store.getState());
      const result = next(action);
      console.log("MyLoggerMiddleware: STATE AFTER : ", store.getState());
      return result;
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  burgerReducer,
  orderReducer,
  signUpReducer
});

const middlewares = [loggerMiddleware, Thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
