
import {API_BASE_URL} from '../config';

import {normalizeResponseErrors} from './utils';

export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const fetchCatalogSuccess = (coursecatalog) => ({
	type: FETCH_CATALOG_SUCCESS,
	coursecatalog
	
})

export const fetchCatalog = (programcode) => dispatch => {
	fetch(`${API_BASE_URL}/catalog/${programcode}`, {method: 'GET'})
		.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(coursecatalog => {
			dispatch(fetchCatalogSuccess(coursecatalog));
		})
}



export const FETCH_ACAD_PLANS_SUCCESS = 'FETCH_ACAD_PLANS_SUCCESS';
export const fetchAcadPlansSuccess = (acadplans) => ({
	type: FETCH_ACAD_PLANS_SUCCESS,
	acadplans	
})


export const FETCH_ACAD_PLANS = 'FETCH_ACAD_PLANS';
export const fetchAcadPlans = (searchQuery) => dispatch => {
	fetch(`${API_BASE_URL}/dashboard/${searchQuery}`, {method: 'GET'})
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


export const SET_PLAN = 'SET_PLAN';
export const setPlan = (plan) => ({
	type: SET_PLAN,
	plan
})

export const fetchAcadPlansAndUpdate = (id, plan) => dispatch => {
	return fetch(`${API_BASE_URL}/acadplan/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(plan)
	})
		.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText)
			}
			return res.json();
		})
		.catch(err => {
			const {reason, message, location} = err;
			console.log(message);
		})
}



export const createNewPlan = acadplans => dispatch => {
	return fetch(`${API_BASE_URL}/acadplan`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(acadplans)
	})
		.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText)
			}
			return res.json();
		})
		.then(res =>res.json())
		.then(() => {
			dispatch(submissionSuccessful(true));
		})
		.catch(err => {
			const {reason, message, location} = err;
			console.log(message);
		})
}

export const SUBMISSION_SUCCESSFUL = 'SUBMISSION_SUCCESSFUL'
export const submissionSuccessful = isSuccessful => ({
	type: SUBMISSION_SUCCESSFUL,
	isSuccessful
})


export const DISABLE_LINK = 'DISABLE_LINK';
export const disableLink = disabledLink => ({
    type: DISABLE_LINK,
    disabledLink
});

export const SET_SEMESTER = 'SET_SEMESTER';
export const setSemester = semester => ({
    type: SET_SEMESTER,
    semester
});

export const SET_SEMESTER_SELECTION = 'SET_SEMESTER_SELECTION';
export const setSemesterSelection = semesterSelection => ({
    type: SET_SEMESTER_SELECTION,
    semesterSelection
});

export const SET_YEAR = 'SET_YEAR';
export const setYear = setYear => ({
    type: SET_YEAR,
    setYear
});




