import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../axios';
import { setIsLoading, addItem, removeItem, setItems } from '../slices/cartSlice';
import { getAuthHeader } from '../../utils/getAuthHeader';
import { getCartFromLocal } from '../../utils/getCartFromLocal';

export const syncAndGetItems = createAsyncThunk(
  'cart/syncAndGetItems',
  async (_, { dispatch }) => {
    try {
      const localCartItems = getCartFromLocal();

      const { data } = await axiosPrivate.post('/cart', localCartItems, {
        headers: { Authorization: getAuthHeader() },
      });

      localStorage.setItem('cart', JSON.stringify(data));
      dispatch(setItems(data));

      return data;
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 422) {
        throw Error('Item not provided');
      }

      throw Error('Internal server error');
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (item, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      await axiosPrivate.post('/cart/add', item, {
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
      await axiosPrivate.delete('/cart/remove', {
        headers: { Authorization: getAuthHeader() },
        data: item,
      });

      const cart = JSON.parse(localStorage.getItem('cart')) || [];

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

// export const getCartItems = createAsyncThunk(
//   'cart/getCartItems',
//   async (_, { dispatch }) => {
//     try {
//       dispatch(setIsLoading(true));

//       const { data } = await axiosPrivate.get('/cart', {
//         headers: { Authorization: getAuthHeader() },
//       });

//       localStorage.setItem('cart', JSON.stringify(data));
//       dispatch(setItems(data));

//       return data;
//     } catch (error) {
//       console.log(error);

//       throw Error('Internal server error');
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   }
// );
