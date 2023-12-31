import { Product } from "@prisma/client";

export interface ProductsWithTotalPrice extends Product {
  totalPrice: number;
}

export function computeProductTotalPrice(
  product: Product,
): ProductsWithTotalPrice {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return {
    ...product,
    totalPrice: Number(product.basePrice) - totalDiscount,
  };
}
