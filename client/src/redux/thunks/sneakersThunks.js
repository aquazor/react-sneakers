import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../axios';
import { setItems } from '../slices/sneakersSlice';

export const getSneakersItems = createAsyncThunk(
  'sneakers/getSneakersItems',
  async (sortField, { dispatch }) => {
    try {
      let url = '/items';

      if (sortField) {
        url += sortField;
      }

      const { data } = await axiosClient.get(url);

      dispatch(setItems(data));
    } catch (error) {
      console.log(error);

      throw Error('Internal server error');
    }
  }
);
