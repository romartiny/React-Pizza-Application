import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
}

const sumTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      findItem ? findItem.count++ : state.items.push({...action.payload, count: 1});

      return sumTotalPrice(state);
    },
    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if(findItem) {
        findItem.count--;
      }

      return sumTotalPrice(state);
    }
  }
});

export const selectCart = (state) => state.cart;

export const {addItem, clearItems, removeItem, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
