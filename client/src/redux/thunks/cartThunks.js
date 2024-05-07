import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../axios';
import { setIsLoading, addItem, removeItem, setItems } from '../slices/cartSlice';
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

      console.log(items);

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

      await axiosClient.post(
        '/cart/add',
        { item },
        {
          headers: { Authorization: getAuthHeader() },
        }
      );

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
      await axiosClient.delete('/cart/remove', {
        headers: { Authorization: getAuthHeader() },
        data: { item },
      });

      const cart = getCartFromLocal();

      if (cart.length > 0) {
        const filtered = cart.filter((obj) => obj.id !== item.id);
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
