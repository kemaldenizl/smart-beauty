import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SkinType } from "@/shared/types/product";

interface SkinState {
  selectedSkinType: SkinType | null;
}

const initialState: SkinState = {
  selectedSkinType: null,
};

const skinSlice = createSlice({
  name: "skin",
  initialState,
  reducers: {
    setSkinType: (state, action: PayloadAction<SkinType>) => {
      state.selectedSkinType = action.payload;
    },
  },
});

export const { setSkinType } = skinSlice.actions;
export default skinSlice.reducer;