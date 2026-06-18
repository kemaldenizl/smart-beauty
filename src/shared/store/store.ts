import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/productsSlice";
import cartReducer from "@/features/cart/cartSlice";
import skinReducer from "@/features/skin/skinSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    skin: skinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;