import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../axios';
import { setIsLoading, setItems } from '../slices/sneakersSlice';

export const getSneakersItems = createAsyncThunk(
  'sneakers/getSneakersItems',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await axiosPrivate.get('/items');

      dispatch(setItems(data));
    } catch (error) {
      console.log(error);

      throw Error('Internal server error');
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
