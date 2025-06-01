'use client';

import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { cart, isLoading, error, removeFromCart } = useCart();

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">エラーが発生しました</div>;
  }

  if (!cart) {
    return <div className="p-4">カートが見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ショッピングカート</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.productId} className="flex items-center border-b py-4">
              <div className="w-24 h-24 bg-gray-100 rounded mr-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">数量: {item.quantity}</p>
                <p className="text-lg font-bold">¥{item.price.toLocaleString()}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFromCart.mutate(item.productId)}
                disabled={removeFromCart.isPending}
              >
                {removeFromCart.isPending ? '削除中...' : '削除'}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">注文概要</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>小計</span>
                <span>¥{cart.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>送料</span>
                <span>¥{cart.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>消費税</span>
                <span>¥{cart.tax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>合計</span>
                  <span>¥{cart.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                // 注文処理を実装
              }}
            >
              レジに進む
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
