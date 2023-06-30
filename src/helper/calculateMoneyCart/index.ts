import {
  Product,
  ProductCommercialItem,
  ProductItem,
} from "../../types/models";

export function calculateTotalAmount(
  products: ProductItem[] | ProductCommercialItem[] | []
) {
  let totalAmount = 0;
  for (const item of products) {
    const product = item.product;
    const quantity = item.quantity;
    const amount = Number(product.price) * Number(quantity);
    totalAmount += amount;
  }
  return String(totalAmount);
}
