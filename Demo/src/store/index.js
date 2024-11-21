import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageSlice from './messageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageSlice,
  },
});

export default store;
