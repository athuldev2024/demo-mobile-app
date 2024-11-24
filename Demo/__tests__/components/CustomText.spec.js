import React from 'react';
import {render} from '@testing-library/react-native';
import {Header} from '../../src/components/common/CustomText'; // Ensure Header is exported properly

describe('Header Component', () => {
  it('render properly', () => {
    const {getByText} = render(<Header>Sample</Header>);
    expect(getByText('Sample')).toBeTruthy();
  });
});
