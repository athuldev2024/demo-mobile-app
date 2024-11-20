import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {InitialScreen, ProfileScreen, ProcessScreen} from '../screens';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProcessScreen"
        component={ProcessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
