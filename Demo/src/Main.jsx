import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

function App() {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={statusBarStyle}
        hidden={false}
      />
    </View>
  );
}

export default App;
