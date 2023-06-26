import { configureStore } from "@reduxjs/toolkit";
import { dataApi } from "@/services/dataApi";
import cartReducer from "./cartSlice";
import ticketReducer from "./ticketsSlice";
import filterReducer from "./filterSlice";
import cinemaReducer from "./cinemaSlice";

export default configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    cart: cartReducer,
    tickets: ticketReducer,
    filters: filterReducer,
    cinema: cinemaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});
