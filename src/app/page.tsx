"use client";

import { SkinTypeSelector } from "@/features/skin/components/skin-type-selector";
import { ProductGrid } from "@/features/products/components/product-grid";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#09090b_0%,#181014_46%,#0b1715_100%)] text-white">
        <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-pink-200">
                Smart Beauty
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Cilt tipine göre premium bakım rutini.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-neutral-300">
                Cilt tipini seç, kısa analiz simülasyonunu bekle ve sana uygun
                ürünleri şık bir alışveriş akışında sepete ekle.
              </p>
            </div>

            <div className="hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block">
              <p className="text-sm font-medium text-neutral-200">
                AI analiz durumu
              </p>
              <div className="mt-4 space-y-3">
                {["Cilt tipi", "Formül uyumu", "Rutin dengesi"].map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-200" />
                    <span className="text-sm text-neutral-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SkinTypeSelector />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <ProductGrid />
            <CartDrawer />
          </div>
        </section>
      </main>
    </>
  );
}
