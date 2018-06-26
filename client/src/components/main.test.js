import React from 'react';
import {shallow, mount} from 'enzyme';

import {Main}  from './main';

describe('<AcadPlanDashboard', () => {
	it('Renders without crashing', () => {

		shallow(<Main />);
	})

})

