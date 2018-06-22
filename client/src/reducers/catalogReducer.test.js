import  catalogReducer  from './catalogReducer';

import {fetchCatalogSuccess, fetchCatalog, fetchAcadPlansSuccess, fetchAcadPlans} from '../actions/catalogActions';


describe('catalogReducer', () => {
	const coursecatalog = {
		courses: []
	}

	const acadplans = {
		plans: []
	}

	const courses = {
		"programCode":"A25800A",
		"programTitle": "Accounting and Finance",
		"totalReqCredit": 68,
		"selection":[10, 1, 1, 1, 1, 1, 1, 1, 1, 11],
		"courses": [
			"Writing and Inquiry,ENG 111,3,1,10",
			"Principles of Financial Accounting,ACC 120,4,1,10",
			"Principles of Managerial Accounting,ACC 121,4,1,10"
			]

	}

	const plans = {
	"username": "peace",
	"firstname": "John",
	"lastname": "David",
	"programcode": "Accounting and Finance, A25800A",
	"plan": [
		"Fall 2018, Writing and Inquiry,ENG 111,3",
		"Fall 2018, Principles of Financial Accounting,ACC 120,4",
		"Fall 2018, Principles of Managerial Accounting,ACC 121,4",
		"Fall 2018,Individual Income Taxes,ACC 129,3",
		]
	}

	it('Should replace the entire state', () => {
		const state = catalogReducer(undefined, {type: '_UNKNOWN'});
		expect(state.coursecatalog).toEqual(
			coursecatalog.courses
		);
	})
			
    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = catalogReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('fetchCatalogSuccess', () => {
        it('Should replace the entire state', () => {
            const state = catalogReducer(undefined, fetchCatalogSuccess(courses));
            expect(state).toEqual(courses);
        });
    });    

	it('Should replace the entire state', () => {
		const state = catalogReducer(undefined, {type: '_UNKNOWN'});
		expect(state.acadplans).toEqual(
			acadplans.plans
		);
	})

    describe('fetchCatalogSuccess', () => {
        it('Should replace the entire state', () => {
            const state = catalogReducer(undefined, fetchAcadPlansSuccess(plans));
            expect(state).toEqual(plans);
        });
    });



});
