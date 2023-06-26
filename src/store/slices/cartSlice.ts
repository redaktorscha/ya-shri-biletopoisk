import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItemCount: (state, { payload }) => {
      const { id } = payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        return state.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      } else {
        state.push({
          id,
          count: 1,
        });
      }
    },

    decrementItemCount: (state, { payload }) => {
      const { id } = payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem.count === 1) {
        return state.filter((item) => item.id !== id);
      }

      return state.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    },

    deleteItem: (state, {payload}) => {
      const { id } = payload;
      return state.filter((item) => item.id !== id);
    }
  },
});

export const { incrementItemCount, decrementItemCount, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
