'use client';

import { useQuery } from '@tanstack/react-query';

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

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">エラーが発生しました</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
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
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">¥{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500">在庫: {product.stock}個</span>
            </div>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                // カートに追加する処理を実装
              }}
            >
              カートに追加
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 