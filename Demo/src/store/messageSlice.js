import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';

const MESSAGES = {
  error_message: 'Error occured while accesing message API.',
};

export const viewMessageData = createAsyncThunk(
  'hbs/message',
  async ({params}, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/hbs/message/${params.myID}/${params.otherID}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

export const pingMessage = createAsyncThunk(
  'message/ping',
  async ({body, callback}, thunkAPI) => {
    try {
      const res = await api({
        path: 'message/ping',
        method: 'POST',
        body,
      });

      callback && callback(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

export const deleteMessage = createAsyncThunk(
  'message/delete',
  async ({params, callback}, thunkAPI) => {
    try {
      const res = await api({
        path: `message/delete/${params.messageID}`,
        method: 'DELETE',
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

const initialState = {
  messages: {},
  isLoading: false,
  hasError: false,
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    updateMessages: (state, action) => {
      state.messages.allMessages = [
        ...state.messages.allMessages,
        action.payload,
      ];
    },
  },
  extraReducers: builder => {
    builder
      // View user data
      .addCase(viewMessageData.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(viewMessageData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.messages = action.payload;
      })
      .addCase(viewMessageData.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      // Message pinged
      .addCase(pingMessage.pending, state => {
        state.hasError = false;
      })
      .addCase(pingMessage.fulfilled, state => {
        state.hasError = false;
      })
      .addCase(pingMessage.rejected, state => {
        state.hasError = true;
      })
      // Message delete
      .addCase(deleteMessage.pending, state => {
        state.hasError = false;
      })
      .addCase(deleteMessage.fulfilled, state => {
        state.hasError = false;
      })
      .addCase(deleteMessage.rejected, state => {
        state.hasError = true;
      });
  },
});

export const {updateMessages} = messageSlice.actions;
export default messageSlice.reducer;
