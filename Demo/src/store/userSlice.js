import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
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
        body,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({params, body}, thunkAPI) => {
    try {
      const res = await api({
        path: `users/update/${params.userID}`,
        method: 'PATCH',
        body,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async ({params, callback}, thunkAPI) => {
    try {
      const res = await api({
        path: `users/delete/${params.userID}`,
        method: 'DELETE',
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  },
);

export const viewUserData = createAsyncThunk(
  'hbs/view',
  async ({params}, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/hbs/view/${params.userID}`,
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

const initialState = {
  userDetails: {},
  allUsers: {},
  isLoading: false,
  hasError: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
      })
      // Update User
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateUser.fulfilled, state => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateUser.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      // Delete User
      .addCase(deleteUser.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteUser.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      // View user data
      .addCase(viewUserData.pending, state => {
        state.hasError = false;
      })
      .addCase(viewUserData.fulfilled, (state, action) => {
        state.hasError = false;
        state.allUsers = action.payload;
      })
      .addCase(viewUserData.rejected, state => {
        state.hasError = true;
      });
  },
});

export const {updateUserDetails, resetUser} = userSlice.actions;
export default userSlice.reducer;
