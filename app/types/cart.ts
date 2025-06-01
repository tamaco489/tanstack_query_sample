export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

export type CartResponse = {
  cart: Cart;
  timestamp: string;
};