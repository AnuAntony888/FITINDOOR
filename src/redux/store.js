
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import cartUiSlice from "./cartUiSlice";

const store = configureStore({
  reducer: {
  
    cartUi: cartUiSlice,
    carttoggle: cartSlice.reducer,

  },
});

export default store;