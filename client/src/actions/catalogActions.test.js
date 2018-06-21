import {
	FETCH_CATALOG_SUCCESS,
	fetchCatalogSuccess,
	fetchCatalog,
	FETCH_ACAD_PLANS_SUCCESS,
	fetchAcadPlansSuccess,
	fetchAcadPlans
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
        const coursecatalog = [];
        const programcode = 'A25800A';
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return coursecatalog;
                }
            })
        );
        console.log(coursecatalog);
        
        const dispatch = jest.fn();
        console.log(fetchCatalog()(dispatch))
        return fetchCatalog(programcode)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`/catalog/${programcode}`);
            expect(dispatch).toHaveBeenCalledWith(fetchBoardSuccess(coursecatalog));
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


