import {
	FETCH_CATALOG_SUCCESS,
	fetchCatalogSuccess,
	fetchCatalog,
	FETCH_ACAD_PLANS_SUCCESS,
	fetchAcadPlansSuccess,
	fetchAcadPlans,
	setSemester,
	SET_SEMESTER,
	setYear,
	SET_YEAR
    } from './catalogActions';

import {API_BASE_URL} from '../config';

describe('fetchCatalogSuccess', () => {
	it('Should return the action', () => {
		const coursecatalog = []
		const action = fetchCatalogSuccess(coursecatalog);
		expect(action.type).toEqual(FETCH_CATALOG_SUCCESS);
		expect(action.coursecatalog).toEqual(coursecatalog);
	});
});


describe('fetchCatalog', () => {
    it('Should dispatch fetchCatalogSuccess', () => {
        const coursecatalog = {
        	acadplans: []
        };
        const programcode = 'A25800A';

        const returnFromFetch = `${API_BASE_URL}/catalog/A25800A`;

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return coursecatalog;
                }
            })
        );


        const dispatch = jest.fn();
        return fetchCatalog(programcode)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(returnFromFetch);
            expect(dispatch).toHaveBeenCalledWith(fetchCatalogSuccess(coursecatalog));
        });
    });
});

describe('fetchAcadPlansSuccess', () => {
	it('Should return the action', () => {
		const acadplans = []
		const action = fetchAcadPlansSuccess(acadplans);
		expect(action.type).toEqual(FETCH_ACAD_PLANS_SUCCESS);
		expect(action.acadplans).toEqual(acadplans);
	});
});


describe('fetchAcadPlans', () => {
    it('Should dispatch fetchAcadPlansSuccess', () => {
        const acadplans = {
        	coursecatalog: []
        };
        const username = 'segen';

        const returnFromFetch = `${API_BASE_URL}/dashboard/${username}`;

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return acadplans;
                }
            })
        );


        const dispatch = jest.fn();
        return fetchAcadPlans(username)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(returnFromFetch);
            expect(dispatch).toHaveBeenCalledWith(fetchAcadPlansSuccess(acadplans));
        });
    });
});


describe('setSemester', () => {
	it('Should return the action', () => {
		const semester = '';
		const action = setSemester(semester);
		expect(action.type).toEqual(SET_SEMESTER);
		expect(action.semester).toEqual(semester);
	});
});

describe('setYear', () => {
	it('Should return the action', () => {
		const year = 2018;
		const action = setYear(year);
		expect(action.type).toEqual(SET_YEAR);
		expect(action.year).toEqual(year);
	});
});






