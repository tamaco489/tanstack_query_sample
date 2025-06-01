'use client';

import { useCart } from '@/app/hooks/useCart';
import { CartItem } from '@/app/types/cart';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="p-4">カートは空です</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ショッピングカート</h1>
      <div className="grid grid-cols-1 gap-4">
        {cart.items.map((item: CartItem) => (
          <div key={item.productId} className="border rounded-lg p-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">数量: {item.quantity}</p>
              <p className="text-lg font-bold">¥{item.price.toLocaleString()}</p>
            </div>
            <button
              onClick={() => removeFromCart.mutate(item.productId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              削除
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>小計:</span>
          <span>¥{cart.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>送料:</span>
          <span>¥{cart.shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>税:</span>
          <span>¥{cart.tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <span>合計:</span>
          <span>¥{cart.total.toLocaleString()}</span>
        </div>
        <button className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
          レジに進む
        </button>
      </div>
    </div>
  );
}
