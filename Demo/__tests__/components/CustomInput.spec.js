import React from 'react';
import {render} from '@testing-library/react-native';
import CustomInput from '../../src/components/common/CustomInput';
import {PaperProvider} from 'react-native-paper';

jest.mock('react-native-paper', () => {
  const {TextInput, View, Text} = require('react-native');

  return {
    PaperProvider: ({children}) => <View>{children}</View>,
    TextInput: jest.fn(
      ({label, placeholder, value, onChangeText, editable}) => (
        <View>
          {label && <Text>{label}</Text>}
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
          />
        </View>
      ),
    ),
  };
});

describe('CustomInput Component', () => {
  const onChangeTextMock = jest.fn();

  const renderWithPaperProvider = (props = {}) => {
    const defaultProps = {
      value: '',
      onChangeText: onChangeTextMock,
      placeholder: 'sample placeholder',
      keyboardType: 'default',
      secureTextEntry: false,
      touched: {},
      errors: {},
      fieldName: 'name',
    };

    return render(
      <PaperProvider>
        <CustomInput {...defaultProps} {...props} />
      </PaperProvider>,
    );
  };

  it('renders the TextInput and check if it exists', () => {
    const {getByPlaceholderText} = renderWithPaperProvider();
    expect(getByPlaceholderText('sample placeholder')).toBeTruthy();
  });

  it('renders the TextInput awith error message', () => {
    const {getByText} = renderWithPaperProvider({
      touched: {name: 'touched'},
      errors: {name: 'name error message'},
      fieldName: 'name',
    });
    expect(getByText('name error message')).toBeTruthy();
  });
});
