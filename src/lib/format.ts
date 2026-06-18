export const formatPrice = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-PK")}`;

export const discountPercent = (price: number, sale: number) =>
  Math.round(((price - sale) / price) * 100);
