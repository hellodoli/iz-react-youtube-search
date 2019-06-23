import React from 'react';
import ReacDOM from 'react-dom';

import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import 'bulma/css/bulma.min.css';

const store = createStore(rootReducer);

ReacDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

