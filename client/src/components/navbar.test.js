
import React from 'react';

import {shallow} from 'enzyme';

import { Navbar } from './navbar';

describe('<Navbar />', () => {
	it('Should render without crashing', () => {
		shallow(<Navbar />);
	});

	it('Should call setKey when nav-item is clicked', () => {
		const callback = jest.fn();
		const wrapper = shallow(<Navbar onSetKey={callback(2)} />);
		const link = wrapper.find('.plan');
		link.simulate('click', {
			preventDefault() {}
		});
		expect(callback).toHaveBeenCalled();
	});

	it('Should call handleOnClick when plan-link is called', () => {
		const callback = jest.fn();
		const wrapper = shallow(<Navbar handleOnClick={callback()} />);
		const link = wrapper.find('.plan-link');
		link.simulate('click', {
			preventDefault() {}
		})
	})

})