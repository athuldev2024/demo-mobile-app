/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Modal, Portal, Text, Button} from 'react-native-paper';

const CustomModal = ({visible, setModalVisible, deleteUserFunc}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <Text style={{fontSize: 18, marginBottom: 20}}>
          Are you sure you want to delete this user?
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            onPress={() => setModalVisible(false)}
            mode="text"
            style={{marginRight: 10}}>
            No
          </Button>
          <Button onPress={deleteUserFunc} mode="contained">
            Yes
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
});

export default CustomModal;
