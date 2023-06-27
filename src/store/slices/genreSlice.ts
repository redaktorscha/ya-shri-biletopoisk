import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreList: (state, { payload }) => {
      return [...payload.genreList];
    },
  },
});

export const { setGenreList } = genreSlice.actions;
export default genreSlice.reducer;
