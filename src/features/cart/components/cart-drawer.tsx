"use client";

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
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sepet</h2>
        <span className="rounded-full bg-white px-3 py-1 text-sm text-neutral-950">
          {totalQuantity} ürün
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-neutral-400">Sepetin şu an boş.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between rounded-2xl bg-black/20 p-4"
            >
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-neutral-400">
                  ₺{item.product.price.toLocaleString("tr-TR")} x{" "}
                  {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.product.id))}
                  className="rounded-full border border-white/10 px-3 py-1 cursor-pointer"
                >
                  -
                </button>

                <button
                  onClick={() => dispatch(addToCart(item.product))}
                  className="rounded-full border border-white/10 px-3 py-1 cursor-pointer"
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="rounded-full bg-red-500/20 px-3 py-1 text-red-200 cursor-pointer"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xl font-semibold">
            <span>Toplam</span>
            <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
          </div>
        </div>
      )}
    </aside>
  );
}