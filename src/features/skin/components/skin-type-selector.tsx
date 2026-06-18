"use client";

import type { SkinType } from "@/shared/types/product";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { setSkinType } from "../skin-slice";
import { getProductsBySkinType } from "@/features/products/products-slice";

const skinTypes: Array<{
  label: string;
  value: SkinType;
  description: string;
}> = [
  {
    label: "Kuru",
    value: "dry",
    description: "Nem bariyerini destekleyen yoğun bakım.",
  },
  {
    label: "Yağlı",
    value: "oily",
    description: "Sebum dengeleyici hafif formüller.",
  },
  {
    label: "Karma",
    value: "combination",
    description: "T bölgesi ve yanaklar için dengeli bakım.",
  },
];

export function SkinTypeSelector() {
  const dispatch = useAppDispatch();
  const selectedSkinType = useAppSelector(
    (state) => state.skin.selectedSkinType
  );

  const handleSelect = (skinType: SkinType) => {
    dispatch(setSkinType(skinType));
    dispatch(getProductsBySkinType(skinType));
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {skinTypes.map((skinType) => {
        const isSelected = selectedSkinType === skinType.value;

        return (
          <button
            key={skinType.value}
            type="button"
            onClick={() => handleSelect(skinType.value)}
            className={`rounded-3xl border p-6 text-left transition cursor-pointer ${
              isSelected
                ? "border-pink-300 bg-pink-300/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <h3 className="text-xl font-medium">{skinType.label}</h3>
            <p className="mt-2 text-sm text-neutral-400">
              {skinType.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}