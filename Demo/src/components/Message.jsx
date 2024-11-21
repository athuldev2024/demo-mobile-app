import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {
  viewMessageData,
  pingMessage,
  deleteMessage,
  updateMessages,
} from '../store/messageSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {io} from 'socket.io-client';

const LOCALHOST_URL = 'http://localhost:3000';

import COLORS from '../constants/colors';

const Card = ({item}) => {
  const dispatch = useDispatch();

  const deleteMessageFunc = () => {
    dispatch(
      deleteMessage({
        params: {
          messageID: item.id,
        },
      }),
    );
  };

  return (
    <View
      style={{
        ...styles.card,
        alignSelf: item.alignSelf,
      }}>
      <Text>{item.message}</Text>
      <TouchableOpacity onPress={deleteMessageFunc}>
        <Icon name="restore-from-trash" size={30} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

function Message(props) {
  const socket = io(LOCALHOST_URL, {transports: ['websocket']});
  const [ping, changePing] = React.useState('');
  const [userID, setUserID] = useState('');

  const dispatch = useDispatch();

  const {messages} = useSelector(state => state.message);

  useEffect(() => {
    if (!userID) {
      AsyncStorage.getItem('userDetails').then(userDetails => {
        if (userDetails) {
          setUserID(JSON.parse(userDetails).userID);

          dispatch(
            viewMessageData({
              params: {
                myID: JSON.parse(userDetails).userID,
                otherID: props.route.params.item.id,
              },
            }),
          );
        }
      });
    }
  });

  useEffect(() => {
    if (userID) {

      socket.on('connect', () => {
        socket.emit('registerUser', userID);
      });

      socket.on('receiveMessage', messageObj => {
        dispatch(
          updateMessages({
            bgColor: messageObj.sender === userID ? 'aqua' : 'lightgreen',
            alignSelf: messageObj.sender === userID ? 'flex-end' : 'flex-start',
            ...messageObj,
          }),
        );
      });
    }
  }, [userID, dispatch, socket]);

  const sendPing = () => {
    if (ping) {
      dispatch(
        pingMessage({
          body: {
            sender: userID,
            receiver: props.route.params.item.id,
            message: ping,
          },
          callback: resJson => {
            changePing('');
            socket.emit('multicastMessage', {
              messageObj: {
                id: resJson.messageID,
                sender: userID,
                receiver: props.route.params.item.id,
                message: ping,
              },
              userIds: [userID, props.route.params.item.id],
            });
          },
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <ScrollView>
          {messages?.allMessages?.length > 0 &&
            messages?.allMessages.map(item => {
              return <Card key={item.id} item={item} />;
            })}
        </ScrollView>
      </View>

      <View style={styles.pingConatiner}>
        <TextInput
          style={styles.customInput}
          label="ping"
          value={ping}
          onChangeText={changePing}
          placeholder="Enter message"
        />
        <TouchableOpacity onPress={sendPing}>
          <Icon name="message" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messageContainer: {
    flexDirection: 'column',
    gap: 20,
    height: 500,
  },
  pingConatiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 30,
  },
  customInput: {
    width: 270,
    marginVertical: 10,
  },
  card: {
    width: 200,
    height: 70,
    padding: 10,
    backgroundColor: 'aqua',
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});
export default Message;
