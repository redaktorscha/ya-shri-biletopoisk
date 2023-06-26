import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  'name': false,
  'genre': false,
  'cinema': false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveFilter: (state, { payload }) => {
      const { activeFilter } = payload;
      state[activeFilter] = true;
    },
  },
});

export const { setActiveFilter } = filterSlice.actions;
export default filterSlice.reducer;
