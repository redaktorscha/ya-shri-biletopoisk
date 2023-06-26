import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, { payload }) => {
      return [...payload.tickets];
    },
  },
});

export const { setTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
