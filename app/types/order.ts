import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: number;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderResponse = {
  orders: Order[];
  total: number;
  timestamp: string;
};
