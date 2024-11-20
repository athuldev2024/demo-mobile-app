import React from 'react';
import {TextInput} from 'react-native-paper';
import {Text, StyleSheet} from 'react-native';
function CustomInput(props) {
  const {
    value,
    onChangeText,
    placeholder,
    keyboardType,
    secureTextEntry,
    style = {},
    editable = true,
    touched,
    errors,
    fieldName,
  } = props;

  return (
    <>
      <TextInput
        label={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={style}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        mode={'outlined'}
      />
      {touched[fieldName] && errors[fieldName] && (
        <Text style={styles.errorText}>{errors[fieldName]}</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});

export default CustomInput;
