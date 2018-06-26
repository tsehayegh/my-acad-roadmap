import React from 'react';
import {shallow, mount} from 'enzyme';

import {AcadPlanDashboard} from './acadPlansDashboard';

describe('<AcadPlanDashboard', () => {
	it('Renders without crashing', () => {

		shallow(<AcadPlanDashboard />);
	});

	it('Renders without crashing', () => {
		const wrapper = shallow(<AcadPlanDashboard />);
		console.log(wrapper);
		expect(wrapper.hasClass('container').toEqual(true));
	})

})

