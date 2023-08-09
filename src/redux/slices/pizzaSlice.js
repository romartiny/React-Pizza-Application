import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {sortBy, order, category, currentPage, search} = params;
    const {data} = await axios.get(`https://64984c6b9543ce0f49e1dc4a.mockapi.io/items?page=${currentPage}limit=4&${category}&sortBy=${sortBy}&order=${order}`);

    return data;
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items  = action.payload;
      state.status  = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;