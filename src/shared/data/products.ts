import type { Product } from "@/shared/types/product";

export const products: Product[] = [
  {
    id: "hydrating-cleanser",
    name: "Hydrating Cleanser",
    description: "Kuru ciltler için nazik ve nemlendirici temizleyici.",
    price: 420,
    imageUrl: "/products/hydrating-cleanser.png",
    skinTypes: ["dry"],
  },
  {
    id: "oil-control-serum",
    name: "Oil Control Serum",
    description: "Yağlı ciltler için sebum dengeleyici serum.",
    price: 560,
    imageUrl: "/products/oil-control-serum.png",
    skinTypes: ["oily"],
  },
  {
    id: "balance-moisturizer",
    name: "Balance Moisturizer",
    description: "Karma ciltler için hafif yapılı nemlendirici.",
    price: 490,
    imageUrl: "/products/balance-moisturizer.png",
    skinTypes: ["combination"],
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