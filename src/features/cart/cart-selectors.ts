import type { RootState } from "@/shared/store/store";
import type { CartItem } from "@/shared/types/cart";

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: CartItem) => total + item.product.price * item.quantity,
    0
  );

export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);