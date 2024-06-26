import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../axios';
import {
  setIsLoading,
  addItem,
  removeItem,
  setItems,
  decrementCount,
} from '../slices/cartSlice';
import { getAuthHeader } from '../../utils/getAuthHeader';
import { getCartFromLocal } from '../../utils/getCartFromLocal';

export const syncAndGetItems = createAsyncThunk(
  'cart/syncAndGetItems',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const localCartItems = getCartFromLocal();

      const {
        data: { items },
      } = await axiosClient.post(
        '/cart',
        { items: localCartItems },
        {
          headers: { Authorization: getAuthHeader() },
        }
      );

      localStorage.setItem('cart', JSON.stringify(items));
      dispatch(setItems(items));

      return items;
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

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (item, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await axiosClient.post(
        '/cart/add',
        { item },
        {
          headers: { Authorization: getAuthHeader() },
        }
      );

      dispatch(addItem(data.item));
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
      await axiosClient.delete('/cart/remove', {
        headers: { Authorization: getAuthHeader() },
        data: { item },
      });

      const cart = getCartFromLocal();

      if (cart.length > 0) {
        const filtered = cart.filter((cartItem) => cartItem.code !== item.code);
        localStorage.setItem('cart', JSON.stringify(filtered));
      }

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

export const decrementItemCount = createAsyncThunk(
  'cart/decrementItemCount',
  async (item, { dispatch }) => {
    try {
      await axiosClient.delete('/cart/decrement', {
        headers: { Authorization: getAuthHeader() },
        data: { item },
      });

      dispatch(decrementCount(item));
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 422) {
        throw Error('Item not provided');
      }

      throw Error('Internal server error');
    }
  }
);
