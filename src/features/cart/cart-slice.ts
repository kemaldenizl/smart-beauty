import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/shared/types/product";
import type { CartItem } from "@/shared/types/cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        product: action.payload,
        quantity: 1,
      });
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.product.id !== action.payload
        );
        return;
      }

      existingItem.quantity -= 1;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;