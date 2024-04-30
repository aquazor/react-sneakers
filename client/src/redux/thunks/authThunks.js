import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../axios';
import { BASE_URL } from '../../constants';
import { setIsLoading, setToken, setUser } from '../slices/authSlice';
import { getAuthHeader } from '../../utils/getAuthHeader';

export const getMe = createAsyncThunk('auth/getMe', async (_, { dispatch }) => {
  try {
    dispatch(setIsLoading(true));

    const { data } = await axiosPrivate.get(`${BASE_URL}/auth/getMe`, {
      headers: { Authorization: getAuthHeader() },
    });

    dispatch(setUser(data.user));
  } catch (error) {
    console.log(error);

    if (error?.response?.status === 401) {
      dispatch(setToken(null));

      throw Error('Invalid token');
    }

    throw Error('Internal server error');
  } finally {
    dispatch(setIsLoading(false));
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await axiosPrivate.post(`${BASE_URL}/auth/register`, userData);

      console.log(data);
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 400) {
        throw Error('User already exists');
      }

      throw Error('Internal server error');
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const login = createAsyncThunk('auth/login', async (userData, { dispatch }) => {
  try {
    dispatch(setIsLoading(true));

    const { data } = await axiosPrivate.post(`${BASE_URL}/auth/login`, userData);

    dispatch(setUser(data.user));
    dispatch(setToken(data.token));
  } catch (error) {
    console.log(error);

    if (error?.response?.status === 401) {
      throw Error('Wrong email or password');
    }

    throw Error('Internal server error');
  } finally {
    dispatch(setIsLoading(false));
  }
});
