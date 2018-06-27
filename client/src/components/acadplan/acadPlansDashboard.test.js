import React from 'react';
import {shallow, mount} from 'enzyme';

import {AcadPlanDashboard} from './acadPlansDashboard';

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
    } from '../../actions/catalogActions';

const mockFetchAcadPlansSuccessAction = {
	type: 'FETCH_ACAD_PLANS_SUCCESS'
}

jest.mock('../../actions/catalogActions', () => Object.assign({},
	require.requireActual('../../actions/catalogActions'),
	{
		fetchAcadPlans: jest.fn().mockImplementation(() => {
			return mockFetchAcadPlansSuccessAction;
		})
	}
))


describe('<AcadPlanDashboard', () => {
	it('Renders without crashing', () => {

		shallow(<AcadPlanDashboard />);
	});

	it('Renders without crashing', () => {
		const wrapper = shallow(<AcadPlanDashboard fetchAcadPlans={jest.fn()} />);
		console.log(wrapper);
		expect(wrapper.hasClass('container').toEqual(true));
	})

})

