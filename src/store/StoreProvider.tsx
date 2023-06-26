"use client";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store/slices/store";

export const StoreProvider = ({children}) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}