import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Dropdown} from 'react-native-paper-dropdown';

const CustomDropDown = ({
  value,
  changeValue,
  OPTIONS,
  touched,
  errors,
  fieldName,
}) => {
  return (
    <>
      <View style={styles.dropDownContainer}>
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          options={OPTIONS}
          value={value}
          onSelect={gdr => {
            changeValue(gdr);
          }}
        />
      </View>
      {touched[fieldName] && errors[fieldName] && (
        <Text style={styles.errorText}>{errors[fieldName]}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {width: '90%', backgroundColor: 'transparent'},
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});

export default CustomDropDown;
