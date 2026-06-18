import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import cartReducer from "@/features/cart/cart-slice";
import productsReducer from "@/features/products/products-slice";
import skinReducer from "@/features/skin/skin-slice";
import type { Product, SkinType } from "@/shared/types/product";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true;

const dryProducts: Product[] = [
  {
    id: "hydrating-cleanser",
    name: "Hydrating Cleanser",
    description: "Kuru ciltler için nazik ve nemlendirici temizleyici.",
    price: 420,
    imageUrl: "/products/hydrating-cleanser.png",
    skinTypes: ["dry"],
  },
  {
    id: "daily-sunscreen",
    name: "Daily Sunscreen SPF 50",
    description: "Tüm cilt tipleri için hafif güneş koruyucu.",
    price: 380,
    imageUrl: "/products/daily-sunscreen.png",
    skinTypes: ["dry", "oily", "combination"],
  },
];

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={String(src)} {...props} />
  ),
}));

vi.mock("@/features/products/products-api", () => ({
  fetchProductsBySkinType: (skinType: SkinType) =>
    new Promise<{ skinType: SkinType; products: Product[] }>((resolve) => {
      setTimeout(() => {
        resolve({
          skinType,
          products: skinType === "dry" ? dryProducts : [],
        });
      }, 3000);
    }),
}));

function setup() {
  const container = document.createElement("div");
  const root: Root = createRoot(container);
  const store = configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      skin: skinReducer,
    },
  });

  document.body.appendChild(container);

  act(() => {
    root.render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  return {
    container,
    root,
  };
}

function getButton(container: HTMLElement, text: string) {
  const button = Array.from(container.querySelectorAll("button")).find((item) =>
    item.textContent?.includes(text)
  );

  if (!button) {
    throw new Error(`Button with text "${text}" was not found.`);
  }

  return button;
}

describe("product shopping flow", () => {
  let root: Root | null = null;
  let container: HTMLElement | null = null;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }

    container?.remove();
    root = null;
    container = null;
    vi.useRealTimers();
  });

  it("shows skeleton while products load and updates cart total after adding a recommended product", async () => {
    const rendered = setup();
    root = rendered.root;
    container = rendered.container;
    const view = rendered.container;

    expect(view.textContent).toContain(
      "Ürün önerilerini görmek için önce cilt tipini seç."
    );

    act(() => {
      getButton(view, "Kuru").dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    expect(view.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
    expect(view.textContent).not.toContain("Hydrating Cleanser");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(view.textContent).toContain("Hydrating Cleanser");
    expect(view.textContent).toContain("Daily Sunscreen SPF 50");

    act(() => {
      getButton(view, "Sepete Ekle").dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    expect(view.textContent).toContain("1 ürün");
    expect(view.textContent).toContain("Ara toplam");
    expect(view.textContent).toContain("₺420");
    expect(view.textContent).toContain("Toplam");
  });
});
