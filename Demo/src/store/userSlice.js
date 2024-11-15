import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';

const MESSAGES = {
  error_message: 'Error occured while accesing user API.',
};

export const loginUser = createAsyncThunk(
  'users/login',
  async ({body}, thunkAPI) => {
    try {
      const res = await api({
        path: 'users/login',
        method: 'POST',
        params: {},
        body,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'users/register',
  async ({body}, thunkAPI) => {
    try {
      const res = await api({
        path: 'users/register',
        method: 'POST',
        params: {},
        body,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

const initialState = {
  userDetails: {},
  allUsers: [],
  isLoading: false,
  hasError: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails(state, action) {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
    resetUser: () => initialState,
  },
  extraReducers: builder => {
    builder
      // Login User
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.userDetails = action.payload;
      })
      .addCase(loginUser.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      // Register User
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.userDetails = action.payload;
      })
      .addCase(registerUser.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {updateUserDetails, resetUser} = userSlice.actions;
export default userSlice.reducer;
