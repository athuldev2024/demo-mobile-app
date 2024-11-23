import React from 'react';
import {render} from '@testing-library/react-native';
import {Header} from '../../src/components/common/CustomText'; // Ensure Header is exported properly

describe('Header Component', () => {
  it('matches snapshot', () => {
    const {toJSON} = render(<Header>Text</Header>);
    expect(toJSON()).toMatchSnapshot();
  });
});
