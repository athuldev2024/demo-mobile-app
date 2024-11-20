import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Message, Update} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';

function ProcessScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const goBackFunc = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back"
        onPress={goBackFunc}
        size={30}
        color={COLORS.primary}
        style={styles.back}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  back: {alignSelf: 'flex-start'},
});

export default ProcessScreen;
