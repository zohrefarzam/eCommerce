export type CartItemDto = {
  productId: string;
  quantity: number;
};

export type CartResponse = {
  items: CartItemDto[];
};
