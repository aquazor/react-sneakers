import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../axios';
import { setIsLoading, setItems } from '../slices/sneakersSlice';

export const getSneakersItems = createAsyncThunk(
  'sneakers/getSneakersItems',
  async (sortField, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      let url = '/items';

      if (sortField) {
        url += sortField;
      }

      const { data } = await axiosClient.get(url);

      dispatch(setItems(data.items));
    } catch (error) {
      console.log(error);

      throw Error('Internal server error');
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
