import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setCinemaList: (state, { payload }) => {
      state = payload.cinemaList;
    },
  },
});

export const { setCinemaList } = cinemaSlice.actions;
export default cinemaSlice.reducer;
