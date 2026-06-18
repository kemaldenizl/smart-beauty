"use client";

import type { Product } from "@/shared/types/product";
import { useAppDispatch } from "@/shared/store/hooks";
import { addToCart } from "@/features/cart/cart-slice";
import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article
      className={`rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden rounded-2xl bg-neutral-900">
        <ProductImage src={product.imageUrl} alt={product.name} />
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-medium">{product.name}</h3>

        <p className="mt-2 text-sm text-neutral-400">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-semibold">
            ₺{product.price.toLocaleString("tr-TR")}
          </span>

          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-950 transition hover:bg-pink-200 cursor-pointer"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}