import { createSelector } from "@reduxjs/toolkit";

const cartSelector = (state) => state.cart.items;

export const cartTotalSelector = createSelector([cartSelector], (items) => {
  return items.reduce((totalCount, curItem) => totalCount + curItem.count, 0);
});
