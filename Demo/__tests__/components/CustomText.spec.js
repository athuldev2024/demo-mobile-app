import React from 'react';
import {render} from '@testing-library/react-native';
import {Header} from '../../src/components';
import COLORS from '../../src/constants/colors';

describe('Header Component', () => {
  it('renders the children text correctly', () => {
    const {getByText} = render(<Header>Hello World</Header>);
    const headerText = getByText('Hello World');
    expect(headerText).toBeTruthy();
  });

  it('applies the correct styles', () => {
    const {getByText} = render(<Header>Test Header</Header>);
    const headerText = getByText('Test Header');

    expect(headerText.props.style).toMatchObject({
      color: COLORS.primary,
      fontFamily: 'sans-serif-thin',
      fontWeight: 'bold',
    });
  });

  it('uses the correct text variant', () => {
    const {getByText} = render(<Header>Variant Test</Header>);
    const headerText = getByText('Variant Test');
    expect(headerText.props.variant).toBe('headlineLarge');
  });
});
