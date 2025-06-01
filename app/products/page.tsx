'use client';

import { useQuery } from '@tanstack/react-query';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data.products;
}

export default function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { cart, addToCart, updateQuantity } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">エラーが発生しました</div>;
  }

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart.mutate({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    });
    // 数量をリセット
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const getCartItemQuantity = (productId: number): number => {
    return cart?.items.find(item => item.productId === productId)?.quantity || 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          const cartQuantity = getCartItemQuantity(product.id);
          const selectedQuantity = quantities[product.id] || 1;
          const remainingStock = product.stock - cartQuantity;

          return (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">¥{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">在庫: {remainingStock}個</span>
              </div>
              {cartQuantity > 0 && (
                <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
                  カートに {cartQuantity} 個追加済み
                </div>
              )}
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor={`quantity-${product.id}`} className="text-sm text-gray-600">
                  数量:
                </label>
                <select
                  id={`quantity-${product.id}`}
                  value={selectedQuantity}
                  onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                  className="border rounded px-2 py-1"
                  disabled={remainingStock === 0}
                >
                  {[...Array(Math.min(remainingStock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                onClick={() => handleAddToCart(product)}
                disabled={addToCart.isPending || remainingStock === 0}
              >
                {addToCart.isPending ? '追加中...' : remainingStock === 0 ? '在庫切れ' : 'カートに追加'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
} 