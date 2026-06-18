"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../cart-slice";
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "../cart-selectors";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl lg:sticky lg:top-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
            Alışveriş
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Sepet</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-neutral-950">
          {totalQuantity} ürün
        </span>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-200/10 text-2xl">
            +
          </div>
          <p className="mt-4 font-medium text-white">Sepetin şu an boş.</p>
          <p className="mt-2 text-sm leading-6 text-neutral-400">
            Cilt tipini seçtikten sonra önerilen ürünleri buraya ekleyebilirsin.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-3"
              >
                <div className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-neutral-900">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium">
                      {item.product.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      ₺{item.product.price.toLocaleString("tr-TR")} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center rounded-full border border-white/10 bg-white/5">
                    <button
                      type="button"
                      aria-label={`${item.product.name} miktarını azalt`}
                      onClick={() => dispatch(decreaseQuantity(item.product.id))}
                      className="h-9 w-9 cursor-pointer rounded-full text-lg text-neutral-200 transition hover:bg-white/10"
                    >
                      -
                    </button>

                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`${item.product.name} miktarını artır`}
                      onClick={() => dispatch(addToCart(item.product))}
                      className="h-9 w-9 cursor-pointer rounded-full text-lg text-neutral-200 transition hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="cursor-pointer rounded-full bg-red-400/15 px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-400/25"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
            <div className="flex items-center justify-between text-sm text-neutral-300">
              <span>Ara toplam</span>
              <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xl font-semibold">
              <span>Toplam</span>
              <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
