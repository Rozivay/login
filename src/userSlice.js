
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      const users = response.data;
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        return user;
      } else {
        return thunkAPI.rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      const users = response.data;
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
        return thunkAPI.rejectWithValue('Username is already taken');
      } else {
        const newUser = await axios.post(API_URL, { username, password });
        return newUser.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
