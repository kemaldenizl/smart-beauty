import type { Product, SkinType } from "@/shared/types/product";
import { routeApi } from "@/shared/lib/api/route-api";

interface ProductsResponse {
  skinType: SkinType;
  products: Product[];
}

export async function fetchProductsBySkinType( skinType: SkinType): Promise<ProductsResponse> {
  const response = await routeApi<ProductsResponse>({
    method: "GET",
    endpoint: "/api/products",
    query: { skinType },
  });

  if (!response.success) {
    throw new Error("Products could not be fetched.");
  }

  return response.data;
}