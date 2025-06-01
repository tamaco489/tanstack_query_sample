import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CART_STORAGE_KEY = 'ec-cart';

// ローカルストレージからカートを取得
const getCartFromStorage = (): Cart => {
  if (typeof window === 'undefined') {
    return {
      id: 'cart_' + Date.now(),
      items: [],
      subtotal: 0,
      shipping: 800,
      tax: 0,
      total: 800
    };
  }

  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (storedCart) {
    return JSON.parse(storedCart);
  }

  return {
    id: 'cart_' + Date.now(),
    items: [],
    subtotal: 0,
    shipping: 800,
    tax: 0,
    total: 800
  };
};

// カートをローカルストレージに保存
const saveCartToStorage = (cart: Cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

// カートの計算を更新
const updateCartCalculations = (items: CartItem[]): Cart => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.floor(subtotal * 0.1);
  const shipping = items.length > 0 ? 800 : 0;
  const total = subtotal + tax + shipping;

  return {
    id: 'cart_' + Date.now(),
    items,
    subtotal,
    shipping,
    tax,
    total
  };
};

export function useCart() {
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<Cart>(getCartFromStorage);

  // カートの取得
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: () => Promise.resolve(cart),
    initialData: cart
  });

  // カートへの商品追加
  const addToCart = useMutation({
    mutationFn: async (item: CartItem) => {
      const currentItems = [...cart.items];
      const existingItemIndex = currentItems.findIndex(i => i.productId === item.productId);

      if (existingItemIndex > -1) {
        currentItems[existingItemIndex].quantity += item.quantity;
      } else {
        currentItems.push(item);
      }

      const updatedCart = updateCartCalculations(currentItems);
      saveCartToStorage(updatedCart);
      setCart(updatedCart);
      return Promise.resolve(updatedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  // カートからの商品削除
  const removeFromCart = useMutation({
    mutationFn: async (productId: number) => {
      const updatedItems = cart.items.filter(item => item.productId !== productId);
      const updatedCart = updateCartCalculations(updatedItems);
      saveCartToStorage(updatedCart);
      setCart(updatedCart);
      return Promise.resolve(updatedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  // カートの商品数量更新
  const updateQuantity = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      const updatedItems = cart.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      const updatedCart = updateCartCalculations(updatedItems);
      saveCartToStorage(updatedCart);
      setCart(updatedCart);
      return Promise.resolve(updatedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  // カートのクリア
  const clearCart = useMutation({
    mutationFn: async () => {
      const emptyCart = updateCartCalculations([]);
      saveCartToStorage(emptyCart);
      setCart(emptyCart);
      return Promise.resolve(emptyCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  return {
    cart: data,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
} 