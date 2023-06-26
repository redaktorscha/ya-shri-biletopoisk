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
    setFilterTitle: (state, { payload }) => {
      state.title = payload.title;
    },
    setFilterGenre: (state, { payload }) => {
      state.genre = payload.genre;
    },
    setFilterCinema: (state, { payload }) => {
      state.cinema = payload.cinema;
    },
  },
});

export const { setFilterTitle, setFilterGenre, setFilterCinema } =
  filterSlice.actions;
export default filterSlice.reducer;
