import React from 'react';
import {render, fireEvent, act, cleanup} from '@testing-library/react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import CustomModal from '../../src/components/common/CustomModal';

const setModalVisibleMock = jest.fn();
const deleteUserFuncMock = jest.fn();
const renderWithPaperProvider = props =>
  render(
    <PaperProvider>
      <CustomModal {...props} />
    </PaperProvider>,
  );

describe('CustomModal Component', () => {
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
    const {getByText, toJSON} = renderWithPaperProvider({
      visible: true,
      setModalVisible: setModalVisibleMock,
      deleteUserFunc: deleteUserFuncMock,
    });
    expect(toJSON()).toMatchSnapshot();
    expect(
      getByText('Are you sure you want to delete this user?'),
    ).toBeTruthy();
    expect(getByText('No')).toBeTruthy();
    expect(getByText('Yes')).toBeTruthy();
  });

  it('modal closes and opens properly when Yes an No button is clicked', async () => {
    const {getByText} = renderWithPaperProvider({
      visible: true,
      setModalVisible: setModalVisibleMock,
      deleteUserFunc: deleteUserFuncMock,
    });

    await act(async () => {
      fireEvent.press(getByText('No'));
    });
    expect(setModalVisibleMock).toHaveBeenCalledWith(false);

    await act(async () => {
      fireEvent.press(getByText('Yes'));
    });
    expect(deleteUserFuncMock).toHaveBeenCalled();
  });
});
