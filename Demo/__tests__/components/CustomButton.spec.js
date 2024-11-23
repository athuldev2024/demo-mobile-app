import React from 'react';
import {render} from '@testing-library/react-native';
import CustomButton from '../../src/components/common/CustomButton';

describe('CustomButton Component', () => {
  it('matches snapshot and renders properly', () => {
    const {getByText} = render(
      <CustomButton title="Click Me" onPress={jest.fn()} />,
    );

    expect(getByText('Click Me')).toBeTruthy();
  });
});
