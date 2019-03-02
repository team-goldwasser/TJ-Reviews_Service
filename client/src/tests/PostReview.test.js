import React from 'react';
import { shallow, mount } from 'enzyme';
import PostReview from '../components/PostReview';
import './setupTest'

describe('PostReview', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<PostReview debug />);
    expect(component).toMatchSnapshot();
  });
  
  it('should have correct rating text', () => {
    const wrapper = mount(<PostReview/>);
    expect(wrapper.find('span').at(0).text()).toEqual('Add your rating');
  });
});
