import React from "react";
import ReacDOM from "react-dom";
import "bulma/css/bulma.min.css";

import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
console.log(store.getState());
ReacDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
