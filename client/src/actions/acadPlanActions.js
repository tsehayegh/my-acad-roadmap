
import {API_BASE_URL} from '../config';


export const FETCH_ACAD_PLANS_SUCCESS = 'FETCH_ACAD_PLANS_SUCCESS_TEST';
export const fetchAcadPlansSuccess = (acadplans) => ({
	type: FETCH_ACAD_PLANS_SUCCESS,
	acadplans
	
})


export const fetchAcadPlans = () => dispatch => {
	fetch(`${API_BASE_URL}/dashboard`, {method: 'GET'})
		.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(acadplans => {
			dispatch(fetchAcadPlansSuccess(acadplans));
		});
}


