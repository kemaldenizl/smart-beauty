import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/products-slice";
import cartReducer from "@/features/cart/cart-slice";
import skinReducer from "@/features/skin/skin-slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    skin: skinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;