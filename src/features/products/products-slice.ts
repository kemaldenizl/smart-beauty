import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product, SkinType } from "@/shared/types/product";
import { fetchProductsBySkinType } from "./products-api";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const getProductsBySkinType = createAsyncThunk(
  "products/getProductsBySkinType",
  async (skinType: SkinType) => {
    return fetchProductsBySkinType(skinType);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsBySkinType.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
      })
      .addCase(getProductsBySkinType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
      })
      .addCase(getProductsBySkinType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;