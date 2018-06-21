import { catalogReducer } from './catalogReducer';

import {fetchCatalogSuccess, fetchCatalog, fetchAcadPlansSuccess, fetchAcadPlans} from '../actions/catalogActions';


describe('catalogReducer', () => {
	
	const coursecatalog = {
		coursecatalog: []
	}
		
	it('Should replace the entire state', () => {
		const state = catalogReducer(undefined, fetchCatalogSuccess(coursecatalog));
		expect(state).toEqual(coursecatalog);
	})
			
	
	

});