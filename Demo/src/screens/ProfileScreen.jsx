import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {CustomButton, Header} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

function ProfileScreen() {
  const navigation = useNavigation();

  const logOutFunc = () => {
    AsyncStorage.clear();
    navigation.navigate('InitialScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header>Profile screen</Header>
        <CustomButton title="" icon="logout" onPress={logOutFunc} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.09,
    paddingVertical: width * 0.09,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default ProfileScreen;
