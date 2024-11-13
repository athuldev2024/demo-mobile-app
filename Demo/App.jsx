import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {PaperProvider} from 'react-native-paper';

import Main from './src/Main';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
