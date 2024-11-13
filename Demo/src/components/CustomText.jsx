import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

const Header = ({children}) => {
  return (
    <Text style={styles.header} variant="headlineLarge">
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    color: COLORS.primary,
  },
});

export {Header};
