import axios from 'axios';

const SUCCESS_MESSAGE_ARR = [201, 200, 204];

const api = async ({path, method, params, body}) => {
  try {
    const response = await axios({
      url: path,
      method,
      baseURL: process.env.REACT_APP_API_URL,
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
    // show toast message for error.
    throw new Error(err?.message);
  }
};

export default api;
