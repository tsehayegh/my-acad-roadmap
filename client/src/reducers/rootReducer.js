import {combineReducers} from 'redux';
import {reducer as formReducer } from 'redux-form';

import catalogReducer from './catalogReducer';

const rootReducer = combineReducers({
	catalogReducer,
	form: formReducer
});


export default rootReducer;