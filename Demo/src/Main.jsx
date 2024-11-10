import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import COLORS from './constants/colors';
import MainNavigation from './navigation/MainNavigation';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        hidden={false}
      />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
});

export default App;
