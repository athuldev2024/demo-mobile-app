import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from '../../src/components/common/CustomButton';

describe('CustomButton Component', () => {
  it('renders a button with the correct title', () => {
    const {getByRole, getByText} = render(
      <CustomButton title="Click Me" onPress={jest.fn()} />,
    );

    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls the onPress function when the button is pressed', () => {
    const pressEvent = jest.fn();
    const {getByText} = render(
      <CustomButton title="sample text" onPress={pressEvent} />,
    );

    const button = getByText('sample text');
    fireEvent.press(button);

    expect(pressEvent).toHaveBeenCalledTimes(1);
  });
});
