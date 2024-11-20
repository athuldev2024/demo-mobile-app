import React from 'react';
import {Button} from 'react-native-paper';

function CustomButton(props) {
  const {icon = null, onPress, title} = props;

  return (
    <Button icon={icon || null} mode="contained" onPress={onPress}>
      {title}
    </Button>
  );
}

export default CustomButton;
