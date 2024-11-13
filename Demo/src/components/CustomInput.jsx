import React from 'react';
import {TextInput} from 'react-native-paper';

function CustomInput(props) {
  const {
    value,
    onChangeText,
    placeholder,
    keyboardType,
    secureTextEntry,
    style = {},
    editable = true,
  } = props;

  return (
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
  );
}

export default CustomInput;
