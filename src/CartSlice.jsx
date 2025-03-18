import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Tracks total count of items
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0); // Update total quantity
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        state.items = state.items.filter(item => item.name !== action.payload.name);
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0); // Deduct the quantity of removed item
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0); // Adjust total quantity
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

