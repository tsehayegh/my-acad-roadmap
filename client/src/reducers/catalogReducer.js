import * as actions from '../actions/catalogActions';

import initialState from './initialState';


const catalogReducer = (state=initialState, action ) => {
	if (action.type === actions.FETCH_CATALOG_SUCCESS){
		return action.coursecatalog
	}else if(action.type === actions.DISABLE_LINK){
		return action.disabledLink
	}else if(action.type === actions.FETCH_ACAD_PLANS_SUCCESS){
		return action.acadplans
	} else if (action.type === actions.SET_YEAR) {
        return action.year;
    } else if (action.type === actions.SET_SEMESTER) {
        return action.semester;
    }else if (action.type === actions.SET_SEMESTER_SELECTION) {
        return action.semesterSelection;
    } else if(action.type === actions.SUBMISSION_SUCCESSFUL) {
    	return action.isSuccessful;
    } else if(action.type === actions.SET_PLAN) {
    	return action.plan
    }

	return state;
}

export default catalogReducer;
