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
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-neutral-400">
        Ürün önerilerini görmek için önce cilt tipini seç.
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProductSkeleton key={index} />
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
    <div className="grid gap-4 md:grid-cols-3">
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