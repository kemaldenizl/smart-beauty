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
            className={`group cursor-pointer rounded-[1.75rem] border p-5 text-left shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 ${
              isSelected
                ? "border-pink-200/60 bg-pink-200/15"
                : "border-white/10 bg-white/[0.06] hover:border-white/20 hover:bg-white/[0.1]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{skinType.label}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {skinType.description}
                </p>
              </div>
              <span
                className={`mt-1 h-4 w-4 shrink-0 rounded-full border ${
                  isSelected
                    ? "border-pink-100 bg-pink-200"
                    : "border-white/20 bg-white/5 group-hover:border-pink-200/60"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
