import React from 'react';
import {render, fireEvent, act, cleanup} from '@testing-library/react-native';
import CustomInput from '../../src/components/common/CustomInput';
import {Provider as PaperProvider} from 'react-native-paper';

describe('CustomInput Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('matches snapshot and renders properly', () => {
    const {toJSON} = render(
      <PaperProvider>
        <CustomInput
          placeholder="Enter your name"
          value=""
          onChangeText={jest.fn()}
          touched={{}}
          errors={{}}
          fieldName="name"
        />
      </PaperProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('see error message when invalid input', () => {
    const {getByText} = render(
      <PaperProvider>
        <CustomInput
          placeholder="Enter your name"
          value=""
          onChangeText={jest.fn()}
          touched={{
            name: 'touched',
          }}
          errors={{
            name: 'error sample',
          }}
          fieldName="name"
        />
      </PaperProvider>,
    );

    expect(getByText('error sample')).toBeTruthy();
  });
});
