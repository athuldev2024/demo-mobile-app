import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import COLORS from './constants/colors';
import MainNavigation from './navigation/MainNavigation';

function App() {
  const {isLoading} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        hidden={Platform.OS === 'ios'}
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      )}
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
