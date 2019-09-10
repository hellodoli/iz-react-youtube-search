import React from 'react';
import ReacDOM from 'react-dom';

import 'bulma/css/bulma.min.css';

import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReacDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));