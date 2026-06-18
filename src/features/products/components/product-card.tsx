"use client";

import type { Product } from "@/shared/types/product";
import { useAppDispatch } from "@/shared/store/hooks";
import { addToCart } from "@/features/cart/cart-slice";
import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const skinTypeLabels: Record<Product["skinTypes"][number], string> = {
  dry: "Kuru cilt",
  oily: "Yağlı cilt",
  combination: "Karma cilt",
};

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article
      className={`group flex min-h-[360px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-200/40 hover:bg-white/[0.1] ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900/80">
        <ProductImage src={product.imageUrl} alt={product.name} />
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          AI önerisi
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2">
          {product.skinTypes.map((skinType) => (
            <span
              key={skinType}
              className="rounded-full border border-pink-200/20 bg-pink-200/10 px-3 py-1 text-xs font-medium text-pink-100"
            >
              {skinTypeLabels[skinType]}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight">
          {product.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-neutral-300">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-xl font-semibold">
            ₺{product.price.toLocaleString("tr-TR")}
          </span>

          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-pink-950/20 transition hover:bg-pink-100"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}
