import React from 'react';
import {render} from '@testing-library/react-native';
import CustomInput from '../../src/components/CustomInput';

describe('CustomInput Component', () => {
  it('renders correctly and matches snapshot', () => {
    const {toJSON} = render(
      <CustomInput placeholder="Enter text" value="test value" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
