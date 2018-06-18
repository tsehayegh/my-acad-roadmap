import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import configureStore from './store/configureStore';

import './index.css';

import Main from './components/main';
import App from './components/auth/app';



import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';


const store = configureStore();

// Hydrate the authToken from localStorage if it exist
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