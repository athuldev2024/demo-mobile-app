import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {InitilaScreen, ProfileScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InitilaScreen"
        component={InitilaScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
