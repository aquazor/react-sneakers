import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../axios';
import { BASE_URL } from '../../constants';
import { setIsLoading, addItem, removeItem } from '../slices/cartSlice';
import { getAuthHeader } from '../../utils/getAuthHeader';

export const addCartItem = createAsyncThunk(
  'cart/addItem',
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
  'cart/removeItem',
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
