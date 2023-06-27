import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setCinemaList: (state, { payload }) => {
      return [...payload.cinemaList];
    },
  },
});

export const { setCinemaList } = cinemaSlice.actions;
export default cinemaSlice.reducer;
