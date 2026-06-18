export type SkinType = "dry" | "oily" | "combination";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  skinTypes: SkinType[];
}