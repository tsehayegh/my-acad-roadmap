import React from 'react';
import {shallow} from 'enzyme';

import {AcadPlanDashboard} from './acadPlansDashboard';


describe('<AcadPlanDashboard', () => {

	it('Renders without crashing', () => {
		shallow(<AcadPlanDashboard />);
	})
})
