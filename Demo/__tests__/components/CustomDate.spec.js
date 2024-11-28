const React = require('react');
import {render, act, fireEvent} from '@testing-library/react-native';
import CustomDate from '../../src/components/common/CustomDate';

jest.mock('react-native-ui-datepicker', () => {
  const {Text} = require('react-native'); // Import required components inside the mock factory
  return ({value}) => <Text testID="datepicker">{value}</Text>;
});

jest.mock('react-native-ui-datepicker', () => {
  const {View, Text, Button} = require('react-native');

  return ({testID, mode, value, display, onChange}) => (
    <View testID={testID}>
      <Text>{mode}</Text>
      <Text>{value}</Text>
      <Text>{display}</Text>
      <Button
        onPress={() => {
          onChange({date: '13-12-2012'});
        }}
        title="sample button"
        accessibilityLabel="just for testing"
      />
    </View>
  );
});

describe('Custom Date Component', () => {
  const onChangeMock = jest.fn();
  it('datepicker opens when picked and closes when date selected', () => {
    const {rerender, getByText, getByTestId, getByRole, queryByTestId} = render(
      <CustomDate
        value={'12-12-2012'}
        changeValue={onChangeMock}
        touched={{}}
        errors={{}}
        fieldName={'dob'}
      />,
    );
    expect(getByText('12-12-2012')).toBeTruthy();

    const showButton = getByTestId('show-button');

    act(() => {
      showButton.props.onClick();
    });

    const dtPicker = getByTestId('dateTimePicker');

    expect(dtPicker).toBeTruthy();

    const dtButton = getByRole('button');

    fireEvent.press(dtButton);

    expect(queryByTestId('dateTimePicker')).not.toBeTruthy();
    expect(onChangeMock).toBeCalledWith('13-12-2012');

    rerender(
      <CustomDate
        value={'12-12-2012'}
        changeValue={onChangeMock}
        touched={{dob: 'touched'}}
        errors={{dob: 'sample errors'}}
        fieldName={'dob'}
      />,
    );

    expect(getByText('sample errors')).toBeTruthy();
  });
});
