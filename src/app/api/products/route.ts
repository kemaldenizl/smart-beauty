import { NextRequest, NextResponse } from "next/server";
import { products } from "@/shared/data/products";
import type { SkinType } from "@/shared/types/product";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const validSkinTypes: SkinType[] = ["dry", "oily", "combination"];

export async function GET(request: NextRequest) {
  const skinType = request.nextUrl.searchParams.get("skinType") as SkinType | null;

  if (!skinType || !validSkinTypes.includes(skinType)) {
    return NextResponse.json(
      { message: "Invalid skin type" },
      { status: 400 }
    );
  }

  await sleep(3000);

  const recommendedProducts = products.filter((product) =>
    product.skinTypes.includes(skinType)
  );

  return NextResponse.json({
    skinType,
    products: recommendedProducts,
  }, { status: 200 });
}