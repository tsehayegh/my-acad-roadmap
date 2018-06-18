
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'


import {loadAuthToken} from '../local-storage';

import authReducer from '../reducers/auth';
import protectedDataReducer from '../reducers/protected-data';

import {setAuthToken, refreshAuthToken} from '../actions/auth';
import initialState from '../reducers/initialState';

import catalogReducer from '../reducers/catalogReducer';
const history = createBrowserHistory()

const reducers = combineReducers({
	catalogReducer,
	auth: authReducer,
	protectedData: protectedDataReducer,
	form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);


export default function configureStore() {
	return createStore(
		reducers, 
		enhancer
	);
}
