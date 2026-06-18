"use client";

import { useAppSelector } from "@/shared/store/hooks";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";

export function ProductGrid() {
  const { items, status, error } = useAppSelector((state) => state.products);
  const selectedSkinType = useAppSelector(
    (state) => state.skin.selectedSkinType
  );

  if (!selectedSkinType) {
    return (
      <div className="min-h-[360px] rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-neutral-300 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-200">
          Ürün önerileri
        </p>
        <p className="mt-4 max-w-md text-2xl font-semibold text-white">
          Ürün önerilerini görmek için önce cilt tipini seç.
        </p>
        <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-400">
          Seçimden sonra analiz simülasyonu başlar ve önerilen ürünler burada
          listelenir.
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <ProductSkeleton key={index} featured={index === 0} />
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
      {items.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          featured={index === 0}
        />
      ))}
    </div>
  );
}
