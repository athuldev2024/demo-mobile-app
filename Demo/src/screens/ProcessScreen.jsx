import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
import {Message, Update} from '../components';

function ProcessScreen() {
  const Stack = createNativeStackNavigator();
  //   const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={Message}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ProcessScreen;
