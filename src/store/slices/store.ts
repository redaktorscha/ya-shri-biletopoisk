import { configureStore } from "@reduxjs/toolkit";
import { dataApi } from "@/services/dataApi";
import cartReducer from "./cartSlice";
import ticketReducer from "./ticketsSlice";
import filterReducer from "./filterSlice";
import cinemaReducer from "./cinemaSlice";
import genreReducer from "./genreSlice";

export default configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    cart: cartReducer,
    tickets: ticketReducer,
    filters: filterReducer,
    cinema: cinemaReducer,
    genre: genreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});
