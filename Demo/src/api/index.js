import axios from 'axios';

const SUCCESS_MESSAGE_ARR = [201, 200, 204];

const REACT_APP_API_URL = 'http://localhost:3000/'; //change this to proccess do env

const api = async ({path, method, params, body}) => {
  try {
    const response = await axios({
      url: path,
      method,
      baseURL: REACT_APP_API_URL,
      params,
      data: body,
      validateStatus: () => true,
    });
    if (!SUCCESS_MESSAGE_ARR.includes(Number(response.status))) {
      throw new Error(response?.data.message ?? 'Axios error occured!!');
    } else {
      return response;
    }
  } catch (err) {
    throw new Error(err?.message);
  }
};

export default api;
