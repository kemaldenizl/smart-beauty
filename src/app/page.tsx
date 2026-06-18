"use client";

import { SkinTypeSelector } from "@/features/skin/components/skin-type-selector";
import { ProductGrid } from "@/features/products/components/product-grid";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white">
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-pink-300">
              Smart Beauty
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Cilt tipine göre yapay zeka destekli bakım önerileri.
            </h1>

            <p className="max-w-2xl text-neutral-400">
              Cilt tipini seç, analiz simülasyonunu bekle ve sana uygun ürünleri
              sepete ekle.
            </p>
          </div>

          <SkinTypeSelector />

          <ProductGrid />

          <CartDrawer />
      </section>
      </main>
    </>
  );
}