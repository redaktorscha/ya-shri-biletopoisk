import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemForRemoveId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItemCount: (state, { payload }) => {
      const { id } = payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      } else {
        state.items.push({
          id,
          count: 1,
        });
      }
    },

    decrementItemCount: (state, { payload }) => {
      const { id } = payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.count === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      }

      state.items = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    },

    deleteItem: (state, { payload }) => {
      const { id } = payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    setItemForRemove: (state, { payload }) => {
      const { id } = payload;
      state.itemForRemoveId = id;
    },
  },
});

export const {
  incrementItemCount,
  decrementItemCount,
  deleteItem,
  setItemForRemove,
} = cartSlice.actions;
export default cartSlice.reducer;
