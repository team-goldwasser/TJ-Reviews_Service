import React from 'react';
import { shallow, mount } from 'enzyme';
import PostReviewSmall from '../components/PostReviewSmall';
import './setupTest'

describe('PostReviewSmall', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<PostReviewSmall debug />);
    expect(component).toMatchSnapshot();
  });

  it('should have correct rating text', () => {
    const wrapper = mount(<PostReviewSmall/>);
    expect(wrapper.find('div').at(2).text()).toEqual('Want to See');
  });
});
