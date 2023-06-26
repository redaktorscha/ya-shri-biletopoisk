import { createSelector } from "@reduxjs/toolkit";

const cartSelector = (state) => state.cart;

export const cartTotalSelector = createSelector([cartSelector], (cart) =>
  cart.reduce((totalCount, curItem) => totalCount + curItem.count, 0)
);
