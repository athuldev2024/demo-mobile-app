import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Header} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {resetUser} from '../store/userSlice';
import {useDispatch} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {deleteUser, viewUserData} from '../store/userSlice';
import {CustomModal} from '../components';

const {width} = Dimensions.get('window');

function ProfileScreen() {
  const [visible, setModalVisible] = useState(false);
  const [userID, setUserID] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!userID) {
      AsyncStorage.getItem('userDetails').then(userDetails => {
        if (userDetails) {
          setUserID(JSON.parse(userDetails).userID);

          dispatch(
            viewUserData({
              params: {userID: JSON.parse(userDetails).userID},
            }),
          );
        }
      });
    }
  });

  const logOutFunc = () => {
    dispatch(resetUser());
    AsyncStorage.clear().then(() => {
      navigation.navigate('InitialScreen');
    });
  };

  const deleteUserFunc = () => {
    dispatch(
      deleteUser({
        params: {userID},
        callback: () => logOutFunc(),
      }),
    );
  };

  const editUser = () => {
    console.log('edit user');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomModal {...{visible, setModalVisible, deleteUserFunc}} />

        <Header>Welcome</Header>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="restore-from-trash" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={editUser}>
          <Icon name="edit" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={logOutFunc}>
          <Icon name="logout" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.qr}>{userID && <QRCode value={userID} />}</View>
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
  qr: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
