const React = require('react');
import {render, fireEvent} from '@testing-library/react-native';
import CustomDropDown from '../../src/components/common/CustomDropDown';

jest.mock('react-native-paper-dropdown', () => {
  const {View, Text, Button} = require('react-native');
  return {
    Dropdown: ({label, placeholder, options, value, onSelect}) => (
      <View accessibilityLabel={label}>
        <Text>{label}</Text>
        <Text>{placeholder}</Text>
        <Text>{value}</Text>

        <Text>{options}</Text>
        <Button
          onPress={() => {
            onSelect('F');
          }}
          title="sample button"
          accessibilityLabel="just for testing"
        />
      </View>
    ),
  };
});

describe('Custom DropDown Component', () => {
  const onChangeMock = jest.fn();
  it('dropdown works properly', () => {
    const {rerender, getByText, getByLabelText} = render(
      <CustomDropDown
        value={'M'}
        changeValue={onChangeMock}
        OPTIONS={[]}
        touched={{}}
        errors={{}}
        fieldName={'gender'}
      />,
    );

    expect(getByLabelText('Gender')).toBeTruthy();
    expect(getByText('M')).toBeTruthy();

    const button = getByLabelText('just for testing');
    fireEvent.press(button);

    expect(onChangeMock).toBeCalled();

    rerender(
      <CustomDropDown
        value={'M'}
        changeValue={onChangeMock}
        OPTIONS={[]}
        touched={{gender: 'touched'}}
        errors={{gender: 'gender error'}}
        fieldName={'gender'}
      />,
    );

    expect(getByText('gender error')).toBeTruthy();
  });
});
