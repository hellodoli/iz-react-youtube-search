import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bulma/css/bulma.min.css'

import history from './history'
import { Router } from 'react-router-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk)),
)
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
)
