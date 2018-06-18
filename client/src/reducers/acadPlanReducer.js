
import * as actions from '../actions/acadPlanActions';

const initialState = {
	coursecatalog: [],
	acadplans: [],
	disabledLink: 'enabledLink'
}


const acadPlanReducer = (state=initialState, action ) => {
	if (action.type === actions.FETCH_ACAD_PLANS_SUCCESS){
		return action.acadplans;
	}
	return state;
}

export default acadPlanReducer;