'use client';

import { useQuery } from '@tanstack/react-query';
import { Order, OrderResponse } from '@/app/types/order';
import { CartItem } from '@/app/types/cart';

async function fetchOrders(): Promise<Order[]> {
  const response = await fetch('/api/orders');
  const data: OrderResponse = await response.json();
  return data.orders;
}

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">エラーが発生しました</div>;
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">注文履歴</h1>
      <div className="grid grid-cols-1 gap-4">
        {orders?.map((order: Order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">注文番号: {order.id}</h2>
                <p className="text-gray-600">注文日時: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item: CartItem) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">数量: {item.quantity}</p>
                  </div>
                  <p className="font-medium">¥{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold">合計</span>
                <span className="text-xl font-bold">¥{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 