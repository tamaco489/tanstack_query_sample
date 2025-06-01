'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  postalCode: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('注文履歴の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-4">読み込み中...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'shipped':
        return '発送済み';
      case 'pending':
        return '処理中';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">注文履歴</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">注文番号: {order.id}</h2>
                <p className="text-gray-600">
                  注文日: {new Date(order.date).toLocaleDateString('ja-JP')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">商品</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>¥{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">配送先</h3>
              <p>{order.shippingAddress.name}</p>
              <p>〒{order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.address}</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>合計金額</span>
                <span>¥{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 