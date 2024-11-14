import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Header} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {resetUser} from '../store/userSlice';
import {useDispatch} from 'react-redux';

const {width} = Dimensions.get('window');

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logOutFunc = () => {
    dispatch(resetUser());
    AsyncStorage.clear().then(() => {
      navigation.navigate('InitialScreen');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header>Profile screen</Header>
        <TouchableOpacity onPress={logOutFunc}>
          <Icon name="logout" size={30} color={COLORS.primary} />
        </TouchableOpacity>
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
