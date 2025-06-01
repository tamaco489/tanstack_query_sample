'use client';

import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/app/hooks/useCart';
import { useState } from 'react';
import { Product, ProductResponse } from '@/app/types/product';

// 商品一覧を取得するAPIリクエスト関数
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  const data: ProductResponse = await response.json();
  return data.products;
}

export default function ProductsPage() {
  // TanStack Queryを使用して商品一覧を取得
  // queryKey: キャッシュのキー
  // queryFn: データ取得関数
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts, // 前段で定義したfetchk関数を実行できるようにする
  });

  // カートの状態と操作関数を取得
  const { cart, addToCart } = useCart();

  // 各商品の選択数量を管理するステート
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // ローディング中の表示
  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  // エラー発生時の表示
  if (error) {
    return <div className="p-4 text-red-500">エラーが発生しました</div>;
  }

  // カートに商品を追加する処理
  const handleAddToCart = (product: Product) => {
    // 選択された数量を取得（未選択の場合は1）
    const quantity = quantities[product.id] || 1;
    // カートに商品を追加
    addToCart.mutate({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    });
    // 数量選択をリセット
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  // 数量選択の変更を処理する関数
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  // カート内の商品数量を取得する関数
  const getCartItemQuantity = (productId: number): number => {
    return cart?.items.find(item => item.productId === productId)?.quantity || 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          // カート内の数量と残り在庫を計算
          const cartQuantity = getCartItemQuantity(product.id);
          const selectedQuantity = quantities[product.id] || 1;
          const remainingStock = product.stock - cartQuantity;

          return (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">

              {/* 商品画像 */}
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded"
                />
              </div>

              {/* 商品名と説明 */}
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>

              {/* 価格と在庫表示 */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">¥{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">在庫: {remainingStock}個</span>
              </div>

              {/* カート追加済み表示 */}
              {cartQuantity > 0 && (
                <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
                  カートに {cartQuantity} 個追加済み
                </div>
              )}

              {/* 数量選択 */}
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
                  {/* 在庫数に応じて選択可能な数量を生成（最大10個まで） */}
                  {[...Array(Math.min(remainingStock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* カート追加ボタン */}
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
};
