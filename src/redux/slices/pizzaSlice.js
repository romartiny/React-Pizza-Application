import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const {sortBy, order, category, currentPage} = params;
    const {data} = await axios.get(`https://64984c6b9543ce0f49e1dc4a.mockapi.io/items?page=${currentPage}limit=4&${category}&sortBy=${sortBy}&order=${order}`);

    if (data.length === 0) return thunkAPI.rejectWithValue('No pizzas');

    return thunkAPI.fulfillWithValue(data);
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
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
