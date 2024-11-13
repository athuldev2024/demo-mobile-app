import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store';

import Main from './src/Main';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Provider store={store}>
          <Main />
        </Provider>
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
