import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Login, Register} from '../components';

function InitialScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('userDetails').then(userDetails => {
      if (userDetails) {
        navigation.navigate('ProfileScreen');
      }
    });
  });

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default InitialScreen;
