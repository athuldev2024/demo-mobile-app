import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import Main from './src/Main';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
