import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Header} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {resetUser} from '../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {deleteUser, viewUserData} from '../store/userSlice';
import {CustomModal} from '../components';
import {DataTable} from 'react-native-paper';

const {width} = Dimensions.get('window');

const UserTable = ({users}) => {
  const navigation = useNavigation();

  const navigateToMessage = item => {
    navigation.navigate('ProcessScreen', {screen: 'Message', params: {item}});
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
      </DataTable.Header>

      {users.map(item => (
        <DataTable.Row key={item.id} onPress={() => navigateToMessage(item)}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.email}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

function ProfileScreen() {
  const [visible, setModalVisible] = useState(false);
  const [userID, setUserID] = useState('');

  const {allUsers} = useSelector(state => state.user);

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
    navigation.navigate('ProcessScreen', {screen: 'Update'});
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

      <View style={styles.dataTable}>
        {allUsers?.userData?.otherUsers?.length > 0 && (
          <UserTable users={allUsers.userData.otherUsers} />
        )}
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
  qr: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataTable: {
    width: '100%',
  },
});

export default ProfileScreen;
