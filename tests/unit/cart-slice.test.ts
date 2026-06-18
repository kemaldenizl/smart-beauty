import { describe, expect, it } from "vitest";
import cartReducer, { addToCart, decreaseQuantity, removeFromCart } from "@/features/cart/cart-slice";
import type { Product } from "@/shared/types/product";
import { selectCartTotalPrice } from "@/features/cart/cart-selectors";

const moisturizer: Product = {
  id: "moisturizer",
  name: "Moisturizer",
  description: "Test product",
  price: 500,
  imageUrl: "/test.png",
  skinTypes: ["dry"],
};

const serum: Product = {
  id: "serum",
  name: "Serum",
  description: "Test product",
  price: 750,
  imageUrl: "/test.png",
  skinTypes: ["oily"],
};

describe("cartSlice", () => {
  it("calculates total cart price correctly", () => {
    let state = cartReducer(undefined, addToCart(moisturizer));
    state = cartReducer(state, addToCart(moisturizer));
    state = cartReducer(state, addToCart(serum));

    const rootState = {
      cart: state,
    } as Parameters<typeof selectCartTotalPrice>[0];

    expect(selectCartTotalPrice(rootState)).toBe(1750);
  });

  it("decreases quantity correctly", () => {
    let state = cartReducer(undefined, addToCart(moisturizer));
    state = cartReducer(state, addToCart(moisturizer));
    state = cartReducer(state, decreaseQuantity(moisturizer.id));

    expect(state.items[0].quantity).toBe(1);
  });

  it("increases quantity correctly", () => {
    let state = cartReducer(undefined, addToCart(moisturizer));
    state = cartReducer(state, addToCart(moisturizer));

    expect(state.items[0].quantity).toBe(2);
  });

  it("removes item correctly", () => {
    let state = cartReducer(undefined, addToCart(moisturizer));
    state = cartReducer(state, removeFromCart(moisturizer.id));

    expect(state.items).toEqual([]);
  });
});