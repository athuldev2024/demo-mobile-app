import React from 'react';
import {Text} from 'react-native-paper';

function Message(props) {
  console.log('Message PROPS: ', props.route.params);
  return <Text>Message screen</Text>;
}

export default Message;
