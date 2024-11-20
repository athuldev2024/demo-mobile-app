import axios from 'axios';
import Toast from 'react-native-toast-message';

const SUCCESS_MESSAGE_ARR = [201, 200, 204];

const REACT_APP_API_URL = 'http://localhost:3000/'; //change this to proccess do env

const MESSAGES = {
  error_message: 'Error occured while accesing axios.',
};

const api = async ({path, method, params = {}, body = {}, headers = {}}) => {
  try {
    const response = await axios({
      url: path,
      method,
      baseURL: REACT_APP_API_URL,
      params,
      data: body,
      headers,
      validateStatus: () => true,
    });
    if (!SUCCESS_MESSAGE_ARR.includes(Number(response.status))) {
      throw new Error(response?.data?.message ?? MESSAGES.error_message);
    } else {
      return response;
    }
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: err?.message ?? MESSAGES.error_message,
      visibilityTime: 3000,
    });
    throw new Error(err?.message);
  }
};

export default api;
