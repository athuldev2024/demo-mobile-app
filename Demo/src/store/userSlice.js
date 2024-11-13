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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: {},
    allUsers: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
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
        state.userDetails = action.payload?.userDetails;
      })
      .addCase(loginUser.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default userSlice.reducer;
