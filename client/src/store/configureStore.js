
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import protectedDataReducer from '../reducers/protected-data';


import catalogReducer from '../reducers/catalogReducer';

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
