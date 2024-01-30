import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, deleteItem, updateItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk('cart/fetchItems', async () => {
  const response = await fetchItems();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const addAsync = createAsyncThunk('cart/addItem', async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const response = await addItem({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const deleteAsync = createAsyncThunk('cart/deleteItems', async (id) => {
  await deleteItem(id);
  // The value we return becomes the `fulfilled` action payload
  return id;
});

export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
  },
});

export default cartSlice.reducer;
