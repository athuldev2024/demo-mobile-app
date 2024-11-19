import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';

import DateTimePicker from 'react-native-ui-datepicker';

const CustomDate = ({value, changeValue, touched, errors, fieldName}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShowDatePicker(prev => !prev)}>
        <Text style={styles.hideButton}>{String(value) ?? 'Select Date'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="single"
          value={value}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={selectedDate => {
            setShowDatePicker(false);
            changeValue(selectedDate.date);
          }}
        />
      )}

      {touched[fieldName] && errors[fieldName] && (
        <Text style={styles.errorText}>{errors[fieldName]}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  hideButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});

export default CustomDate;
