import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../axios';
import { BASE_URL } from '../../constants';
import { setIsLoading, addItem, removeItem, setItems } from '../slices/cartSlice';
import { getAuthHeader } from '../../utils/getAuthHeader';

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await axiosPrivate.get(`${BASE_URL}/cart`, {
        headers: { Authorization: getAuthHeader() },
      });

      localStorage.setItem('cart', JSON.stringify(data));
      dispatch(setItems(data));
    } catch (error) {
      console.log(error);

      throw Error('Internal server error');
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (item, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      await axiosPrivate.post(`${BASE_URL}/cart/add`, item, {
        headers: { Authorization: getAuthHeader() },
      });

      dispatch(addItem(item));
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 422) {
        throw Error('Item not provided');
      }

      throw Error('Internal server error');
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (item, { dispatch }) => {
    try {
      await axiosPrivate.delete(`${BASE_URL}/cart/remove`, {
        headers: { Authorization: getAuthHeader() },
        data: item,
      });

      dispatch(removeItem(item));
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 422) {
        throw Error('Item not provided');
      }

      throw Error('Internal server error');
    }
  }
);
