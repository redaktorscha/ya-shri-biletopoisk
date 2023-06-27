import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  genre: null,
  cinema: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveFilter: (state, { payload }) => {
      const { filterName, filterValue } = payload;
      state[filterName] = filterValue;
    },
  },
});

export const { setActiveFilter } = filterSlice.actions;
export default filterSlice.reducer;
