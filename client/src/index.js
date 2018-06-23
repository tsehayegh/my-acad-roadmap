import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';

import configureStore from './store/configureStore';

import './index.css';

import Main from './components/main';

import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';


const store = configureStore();

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Main />
		</Router>
	</Provider>, 
	document.getElementById('root')
);

console.log(`Client running in ${process.env.NODE_ENV} mode`);