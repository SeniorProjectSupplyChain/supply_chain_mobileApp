export type UserRole =
  | "supplier"
  | "manufacturer"
  | "distributor"
  | "retailer"
  | "consumer";
export const UserRoleArray = [
  "supplier",
  "manufacturer",
  "distributor",
  "retailer",
  "consumer",
];

export type ProductStatus =
  | "CULTIVATED"
  | "HARVESTED"
  | "IMPORTED"
  | "MANUFACTURED"
  | "EXPORTED"
  | "DISTRIBUTING"
  | "RETAILING"
  | "SOLD";
export type ProductDateStatus =
  | "CULTIVATED"
  | "HARVESTED"
  | "IMPORTED"
  | "MANUFACTURED"
  | "EXPORTED"
  | "DISTRIBUTED"
  | "SELLING"
  | "SOLD";
export const ProductStatusArray = [
  "CULTIVATING",
  "HARVESTED",
  "IMPORTED",
  "MANUFACTURED",
  "EXPORTED",
  "DISTRIBUTED",
  "SELLING",
  "SOLD",
];

export type UserStatus = "active" | "inactive";
export const UserStatusArray = ["active", "inactive"];

export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SHIPPING"
  | "SHIPPED";
export const OrderStatusArray = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "SHIPPING",
  "SHIPPED",
];
